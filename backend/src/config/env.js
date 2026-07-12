import dotenv from 'dotenv'

dotenv.config()

const DAY_MS = 24 * 60 * 60 * 1000

export const config = {
  port: process.env.PORT || 4000,
  clientOrigin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim()),

  // Access token (short-lived JWT)
  jwtSecret: process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
  accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',

  // Refresh token (opaque, server-side, revocable)
  refreshTtlMs: Number(process.env.REFRESH_TOKEN_TTL_DAYS || 7) * DAY_MS,

  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 10),

  // Seeded demo account
  demoEmail: process.env.DEMO_EMAIL || 'demo@ecosphere.com',
  demoPassword: process.env.DEMO_PASSWORD || 'EcoSphere@2024',
}

if (!process.env.JWT_SECRET) {
  console.warn(
    '[EcoSphere] Warning: JWT_SECRET is not set. Using an insecure default. Set it in backend/.env before production.'
  )
}
