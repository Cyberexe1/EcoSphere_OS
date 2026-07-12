import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from './config/env.js'
import authRoutes from './routes/auth.js'
import esgRoutes from './routes/esg.js'
import reportsRoutes from './routes/reports.js'
import settingsRoutes from './routes/settings.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
)
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ecosphere-backend', time: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/esg', esgRoutes)
app.use('/api/reports', reportsRoutes)
app.use('/api/settings', settingsRoutes)

// Serve static frontend in production
const publicDir = join(__dirname, '..', 'public')
app.use(express.static(publicDir))

// SPA fallback — serve index.html for any non-API route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next()
  res.sendFile(join(publicDir, 'index.html'))
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Central error handler
app.use((err, req, res, _next) => {
  console.error('[EcoSphere] Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(config.port, () => {
  console.log(`[EcoSphere] API running at http://localhost:${config.port}`)
})
