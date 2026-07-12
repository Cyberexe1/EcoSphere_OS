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

function sessionResponse(res, user, status = 200) {
  const accessToken = signAccessToken(user)
  const refreshToken = issueRefreshToken(user.id)
  return res.status(status).json({ user: toPublicUser(user), accessToken, refreshToken })
}

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
  const { name, email, password, role } = req.body || {}

  const { valid, errors } = validateRegistration({ name, email, password })
  if (!valid) return res.status(400).json({ error: 'Validation failed.', fields: errors })

  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }

  const user = await createUser({ name, email, password, role })
  return sessionResponse(res, user, 201)
})

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const user = findUserByEmail(email)
  const ok = await verifyPassword(user, password)
  if (!ok) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  return sessionResponse(res, user)
})

// POST /api/auth/refresh — rotate refresh token, issue new access token
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body || {}
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required.' })

  const rotated = rotateRefreshToken(refreshToken)
  if (!rotated) return res.status(401).json({ error: 'Invalid or expired refresh token.' })

  const user = findUserById(rotated.userId)
  if (!user) return res.status(401).json({ error: 'User no longer exists.' })

  const accessToken = signAccessToken(user)
  return res.json({ user: toPublicUser(user), accessToken, refreshToken: rotated.token })
})

// POST /api/auth/logout — revoke the refresh token
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body || {}
  if (refreshToken) revokeRefreshToken(refreshToken)
  return res.json({ success: true })
})

// GET /api/auth/me — current user (protected)
router.get('/me', requireAuth, (req, res) => {
  const user = findUserById(req.user.sub)
  if (!user) return res.status(404).json({ error: 'User not found.' })
  return res.json({ user: toPublicUser(user) })
})

// POST /api/auth/change-password (protected) — revokes all sessions after change
router.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  const user = findUserById(req.user.sub)
  if (!user) return res.status(404).json({ error: 'User not found.' })

  const ok = await verifyPassword(user, currentPassword)
  if (!ok) return res.status(401).json({ error: 'Current password is incorrect.' })

  const pwError = validatePassword(newPassword)
  if (pwError) return res.status(400).json({ error: pwError })

  await updatePassword(user, newPassword)
  revokeAllForUser(user.id) // force re-login everywhere

  return res.json({ success: true, message: 'Password updated. Please log in again.' })
})

export default router
