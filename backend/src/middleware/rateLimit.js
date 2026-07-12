// Simple in-memory sliding-window rate limiter (per IP + route).
// For production use a shared store (Redis) instead.
const hits = new Map()

export function rateLimit({ windowMs = 15 * 60 * 1000, max = 10 } = {}) {
  return (req, res, next) => {
    const key = `${req.ip}:${req.path}`
    const now = Date.now()
    const entry = hits.get(key) || { count: 0, resetAt: now + windowMs }

    if (now > entry.resetAt) {
      entry.count = 0
      entry.resetAt = now + windowMs
    }

    entry.count += 1
    hits.set(key, entry)

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      res.set('Retry-After', String(retryAfter))
      return res.status(429).json({ error: 'Too many attempts. Please try again later.' })
    }
    return next()
  }
}
