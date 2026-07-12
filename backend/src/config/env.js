import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 4000,
  clientOrigin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim()),
  jwtSecret: process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  demoEmail: process.env.DEMO_EMAIL || 'demo@ecosphere.com',
  demoPassword: process.env.DEMO_PASSWORD || 'EcoSphere@2024',
}

if (!process.env.JWT_SECRET) {
  console.warn(
    '[EcoSphere] Warning: JWT_SECRET is not set. Using an insecure default. Set it in backend/.env before production.'
  )
}
