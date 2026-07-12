import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import authRoutes from './routes/auth.js'
import esgRoutes from './routes/esg.js'

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
