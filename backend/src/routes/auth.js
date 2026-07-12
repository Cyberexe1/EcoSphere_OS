import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'
import { findUserByEmail, verifyPassword, toPublicUser } from '../data/users.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const user = findUserByEmail(email)
  if (!user || !verifyPassword(user, password)) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  )

  return res.json({ token, user: toPublicUser(user) })
})

// GET /api/auth/me  (protected)
router.get('/me', requireAuth, (req, res) => {
  const user = findUserByEmail(req.user.email)
  return res.json({ user: toPublicUser(user) })
})

export default router
