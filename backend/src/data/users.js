import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { config } from '../config/env.js'

// In-memory user store. Replace with a real database for production.
const users = []

function seedDemoUser() {
  users.push({
    id: 'usr_demo',
    name: 'Sarah Jenkins',
    email: config.demoEmail.toLowerCase(),
    role: 'Chief Sustainability Officer',
    passwordHash: bcrypt.hashSync(config.demoPassword, config.bcryptRounds),
    createdAt: new Date().toISOString(),
  })
}
seedDemoUser()

const normalize = (email) => String(email || '').trim().toLowerCase()

export function findUserByEmail(email) {
  const e = normalize(email)
  return users.find((u) => u.email === e)
}

export function findUserById(id) {
  return users.find((u) => u.id === id)
}

export async function createUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, config.bcryptRounds)
  const user = {
    id: `usr_${randomUUID()}`,
    name: name.trim(),
    email: normalize(email),
    role: role?.trim() || 'ESG Analyst',
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  return user
}

export async function verifyPassword(user, password) {
  if (!user) return false
  return bcrypt.compare(password, user.passwordHash)
}

export async function updatePassword(user, newPassword) {
  user.passwordHash = await bcrypt.hash(newPassword, config.bcryptRounds)
  return user
}

export function toPublicUser(user) {
  if (!user) return null
  const { passwordHash, ...rest } = user
  return rest
}
