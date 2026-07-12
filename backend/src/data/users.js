import bcrypt from 'bcryptjs'
import { config } from '../config/env.js'
import prisma from '../config/database.js'

export async function findUserByEmail(email) {
  const e = String(email || '').trim().toLowerCase()
  return prisma.user.findUnique({ where: { email: e } })
}

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } })
}

export async function createUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, config.bcryptRounds)
  return prisma.user.create({
    data: {
      name: name.trim(),
      email: String(email).trim().toLowerCase(),
      role: role?.trim() || 'ESG Analyst',
      passwordHash,
    },
  })
}

export async function verifyPassword(user, password) {
  if (!user) return false
  return bcrypt.compare(password, user.passwordHash)
}

export async function updatePassword(user, newPassword) {
  const passwordHash = await bcrypt.hash(newPassword, config.bcryptRounds)
  return prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  })
}

export function toPublicUser(user) {
  if (!user) return null
  const { passwordHash, ...rest } = user
  return rest
}
