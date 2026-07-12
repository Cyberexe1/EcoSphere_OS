import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name, role: user.role },
    config.jwtSecret,
    { expiresIn: config.accessExpiresIn }
  )
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwtSecret)
}
