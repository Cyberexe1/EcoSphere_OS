import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { defaultOrganizations, defaultConfig, auditLog } from '../data/settings.js'

const router = Router()

router.use(requireAuth)

// In-memory state (would be DB-backed in production)
let organizations = [...defaultOrganizations]
let config = JSON.parse(JSON.stringify(defaultConfig))

// GET /api/settings — full settings payload
router.get('/', (req, res) => {
  res.json({ organizations, config, auditLog })
})

// GET /api/settings/organizations
router.get('/organizations', (req, res) => {
  res.json({ organizations })
})

// POST /api/settings/organizations — add a new organization
router.post('/organizations', (req, res) => {
  const { name, role, permissions, status, users } = req.body || {}
  if (!name?.trim()) return res.status(400).json({ error: 'Organization name is required.' })

  const org = {
    id: Date.now(),
    name: name.trim(),
    icon: 'apartment',
    role: role || 'Standard User',
    permissions: permissions || 'Read Only',
    status: status || 'Pending',
    users: Number(users) || 0,
  }
  organizations.unshift(org)
  res.status(201).json({ organization: org })
})

// PUT /api/settings/organizations/:id — update an organization
router.put('/organizations/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = organizations.findIndex((o) => o.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Organization not found.' })

  const { name, role, permissions, status, users } = req.body || {}
  if (name) organizations[idx].name = name.trim()
  if (role) organizations[idx].role = role
  if (permissions) organizations[idx].permissions = permissions
  if (status) organizations[idx].status = status
  if (users !== undefined) organizations[idx].users = Number(users)

  res.json({ organization: organizations[idx] })
})

// DELETE /api/settings/organizations/:id
router.delete('/organizations/:id', (req, res) => {
  const id = Number(req.params.id)
  const before = organizations.length
  organizations = organizations.filter((o) => o.id !== id)
  if (organizations.length === before) return res.status(404).json({ error: 'Organization not found.' })
  res.json({ success: true })
})

// GET /api/settings/config
router.get('/config', (req, res) => {
  res.json({ config })
})

// PUT /api/settings/config — update config toggles
router.put('/config', (req, res) => {
  const { esg, notifications } = req.body || {}
  if (esg) config.esg = { ...config.esg, ...esg }
  if (notifications) config.notifications = { ...config.notifications, ...notifications }
  res.json({ config })
})

export default router
