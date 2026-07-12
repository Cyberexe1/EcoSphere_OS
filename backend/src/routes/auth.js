import { Router } from 'express'
import {
  findUserByEmail,
  findUserById,
  createUser,
  verifyPassword,
  updatePassword,
  toPublicUser,
} from '../data/users.js'
import {
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
} from '../data/refreshTokens.js'
import { signAccessToken } from '../utils/jwt.js'
import { isValidEmail, validatePassword, validateRegistration } from '../utils/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { rateLimit } from '../middleware/rateLimit.js'

const router = Router()

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 })

async function sessionResponse(res, user, status = 200) {
  const accessToken = signAccessToken(user)
  const refreshToken = await issueRefreshToken(user.id)
  return res.status(status).json({ user: toPublicUser(user), accessToken, refreshToken })
}

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {}

    const { valid, errors } = validateRegistration({ name, email, password })
    if (!valid) return res.status(400).json({ error: 'Validation failed.', fields: errors })

    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    const user = await createUser({ name, email, password, role })
    return await sessionResponse(res, user, 201)
  } catch (err) { next(err) }
})

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = await findUserByEmail(email)
    const ok = await verifyPassword(user, password)
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    return await sessionResponse(res, user)
  } catch (err) { next(err) }
})

// POST /api/auth/refresh — rotate refresh token, issue new access token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {}
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required.' })

    const rotated = await rotateRefreshToken(refreshToken)
    if (!rotated) return res.status(401).json({ error: 'Invalid or expired refresh token.' })

    const user = await findUserById(rotated.userId)
    if (!user) return res.status(401).json({ error: 'User no longer exists.' })

    const accessToken = signAccessToken(user)
    return res.json({ user: toPublicUser(user), accessToken, refreshToken: rotated.token })
  } catch (err) { next(err) }
})

// POST /api/auth/logout — revoke the refresh token
router.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {}
    if (refreshToken) await revokeRefreshToken(refreshToken)
    return res.json({ success: true })
  } catch (err) { next(err) }
})

// GET /api/auth/me — current user (protected)
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await findUserById(req.user.sub)
    if (!user) return res.status(404).json({ error: 'User not found.' })
    return res.json({ user: toPublicUser(user) })
  } catch (err) { next(err) }
})

// POST /api/auth/change-password (protected) — revokes all sessions after change
router.post('/change-password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {}
    const user = await findUserById(req.user.sub)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    const ok = await verifyPassword(user, currentPassword)
    if (!ok) return res.status(401).json({ error: 'Current password is incorrect.' })

    const pwError = validatePassword(newPassword)
    if (pwError) return res.status(400).json({ error: pwError })

    await updatePassword(user, newPassword)
    await revokeAllForUser(user.id) // force re-login everywhere

    return res.json({ success: true, message: 'Password updated. Please log in again.' })
  } catch (err) { next(err) }
})

export default router
