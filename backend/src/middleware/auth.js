import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header.' })
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret)
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}
