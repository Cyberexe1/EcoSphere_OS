import { randomBytes } from 'crypto'
import { config } from '../config/env.js'

// In-memory refresh-token store: token -> { userId, expiresAt }.
// Opaque + server-side so tokens can be revoked (logout, password change).
const store = new Map()

export function issueRefreshToken(userId) {
  const token = randomBytes(48).toString('hex')
  store.set(token, { userId, expiresAt: Date.now() + config.refreshTtlMs })
  return token
}

export function verifyRefreshToken(token) {
  const entry = store.get(token)
  if (!entry) return null
  if (entry.expiresAt < Date.now()) {
    store.delete(token)
    return null
  }
  return entry.userId
}

// Rotate: invalidate the old token and issue a fresh one.
export function rotateRefreshToken(oldToken) {
  const userId = verifyRefreshToken(oldToken)
  if (!userId) return null
  store.delete(oldToken)
  return { userId, token: issueRefreshToken(userId) }
}

export function revokeRefreshToken(token) {
  return store.delete(token)
}

export function revokeAllForUser(userId) {
  for (const [token, entry] of store.entries()) {
    if (entry.userId === userId) store.delete(token)
  }
}
