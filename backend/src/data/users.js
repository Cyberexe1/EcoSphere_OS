import bcrypt from 'bcryptjs'
import { config } from '../config/env.js'

// In-memory user store seeded with a single demo account.
// Replace with a real database (Postgres, Mongo, etc.) for production.
const users = [
  {
    id: 'usr_demo_1',
    name: 'Sarah Jenkins',
    email: config.demoEmail.toLowerCase(),
    role: 'Chief Sustainability Officer',
    // Password is hashed at startup so we never store plaintext.
    passwordHash: bcrypt.hashSync(config.demoPassword, 10),
  },
]

export function findUserByEmail(email) {
  return users.find((u) => u.email === String(email).trim().toLowerCase())
}

export function verifyPassword(user, password) {
  if (!user) return false
  return bcrypt.compareSync(password, user.passwordHash)
}

export function toPublicUser(user) {
  if (!user) return null
  const { passwordHash, ...rest } = user
  return rest
}
