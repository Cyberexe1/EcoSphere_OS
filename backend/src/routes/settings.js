import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import prisma from '../config/database.js'

const router = Router()

router.use(requireAuth)

// GET /api/settings — full settings payload
router.get('/', async (req, res, next) => {
  try {
    const organizations = await prisma.organization.findMany({ orderBy: { createdAt: 'desc' } })
    const configRows = await prisma.appConfig.findMany()
    const config = buildConfigObject(configRows)
    const auditLog = await prisma.auditLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    })
    res.json({ organizations, config, auditLog })
  } catch (err) { next(err) }
})

// GET /api/settings/organizations
router.get('/organizations', async (req, res, next) => {
  try {
    const organizations = await prisma.organization.findMany({ orderBy: { createdAt: 'desc' } })
    res.json({ organizations })
  } catch (err) { next(err) }
})

// POST /api/settings/organizations — add a new organization
router.post('/organizations', async (req, res, next) => {
  try {
    const { name, role, permissions, status, users } = req.body || {}
    if (!name?.trim()) return res.status(400).json({ error: 'Organization name is required.' })

    const org = await prisma.organization.create({
      data: {
        name: name.trim(),
        icon: 'apartment',
        role: role || 'Standard User',
        permissions: permissions || 'Read Only',
        status: status || 'Pending',
        users: Number(users) || 0,
      },
    })
    res.status(201).json({ organization: org })
  } catch (err) { next(err) }
})

// PUT /api/settings/organizations/:id — update an organization
router.put('/organizations/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, role, permissions, status, users } = req.body || {}

    const org = await prisma.organization.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(role && { role }),
        ...(permissions && { permissions }),
        ...(status && { status }),
        ...(users !== undefined && { users: Number(users) }),
      },
    })
    res.json({ organization: org })
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Organization not found.' })
    next(err)
  }
})

// DELETE /api/settings/organizations/:id
router.delete('/organizations/:id', async (req, res, next) => {
  try {
    await prisma.organization.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Organization not found.' })
    next(err)
  }
})

// GET /api/settings/config
router.get('/config', async (req, res, next) => {
  try {
    const configRows = await prisma.appConfig.findMany()
    res.json({ config: buildConfigObject(configRows) })
  } catch (err) { next(err) }
})

// PUT /api/settings/config — update config toggles
router.put('/config', async (req, res, next) => {
  try {
    const { esg, notifications } = req.body || {}
    const updates = []

    if (esg) {
      for (const [key, value] of Object.entries(esg)) {
        updates.push(prisma.appConfig.upsert({
          where: { key: `esg.${key}` },
          update: { value: String(value) },
          create: { key: `esg.${key}`, value: String(value) },
        }))
      }
    }
    if (notifications) {
      for (const [key, value] of Object.entries(notifications)) {
        updates.push(prisma.appConfig.upsert({
          where: { key: `notifications.${key}` },
          update: { value: String(value) },
          create: { key: `notifications.${key}`, value: String(value) },
        }))
      }
    }

    await Promise.all(updates)
    const configRows = await prisma.appConfig.findMany()
    res.json({ config: buildConfigObject(configRows) })
  } catch (err) { next(err) }
})

// Helper: convert flat key-value rows into nested config object
function buildConfigObject(rows) {
  const config = { esg: {}, notifications: {} }
  for (const row of rows) {
    const [group, key] = row.key.split('.')
    if (config[group] && key) {
      config[group][key] = row.value === 'true' ? true : row.value === 'false' ? false : row.value
    }
  }
  return config
}

export default router
