import { randomBytes } from 'crypto'
import { config } from '../config/env.js'
import prisma from '../config/database.js'

export async function issueRefreshToken(userId) {
  const token = randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + config.refreshTtlMs)
  await prisma.refreshToken.create({
    data: { token, userId, expiresAt },
  })
  return token
}

export async function verifyRefreshToken(token) {
  const entry = await prisma.refreshToken.findUnique({ where: { token } })
  if (!entry) return null
  if (entry.expiresAt < new Date()) {
    await prisma.refreshToken.delete({ where: { id: entry.id } })
    return null
  }
  return entry.userId
}

export async function rotateRefreshToken(oldToken) {
  const userId = await verifyRefreshToken(oldToken)
  if (!userId) return null
  await prisma.refreshToken.delete({ where: { token: oldToken } })
  const newToken = await issueRefreshToken(userId)
  return { userId, token: newToken }
}

export async function revokeRefreshToken(token) {
  try {
    await prisma.refreshToken.delete({ where: { token } })
    return true
  } catch {
    return false
  }
}

export async function revokeAllForUser(userId) {
  await prisma.refreshToken.deleteMany({ where: { userId } })
}
