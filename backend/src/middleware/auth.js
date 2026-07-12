import { verifyAccessToken } from '../utils/jwt.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header.' })
  }

  try {
    req.user = verifyAccessToken(token)
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}

// Optional role-based guard. Usage: requireRole('Admin')
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated.' })
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions.' })
    }
    return next()
  }
}
