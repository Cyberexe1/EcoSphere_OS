/**
 * Centralized API client for EcoSphere backend.
 * Handles token management, auto-refresh, and consistent error handling.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const STORAGE_KEYS = {
  accessToken: 'ecosphere.api.accessToken',
  refreshToken: 'ecosphere.api.refreshToken',
}

// --- Token management ---

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.accessToken)
}

export function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.refreshToken)
}

export function setTokens(accessToken, refreshToken) {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, accessToken)
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken)
}

export function clearTokens() {
  localStorage.removeItem(STORAGE_KEYS.accessToken)
  localStorage.removeItem(STORAGE_KEYS.refreshToken)
}

// --- Core fetch wrapper ---

let refreshPromise = null

async function refreshAccessToken() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')

  const res = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) {
    clearTokens()
    throw new Error('Refresh failed')
  }

  const data = await res.json()
  setTokens(data.accessToken, data.refreshToken)
  return data.accessToken
}

async function getValidToken() {
  const token = getAccessToken()
  if (token) return token

  // Try refresh
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null })
  }
  return refreshPromise
}

/**
 * Make an authenticated API request.
 * Automatically attaches Bearer token and retries once on 401.
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  // Attach auth header for protected routes
  if (!options.noAuth) {
    const token = getAccessToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let res = await fetch(url, { ...options, headers })

  // Auto-refresh on 401
  if (res.status === 401 && !options.noAuth && !options._retried) {
    try {
      const newToken = await refreshAccessToken()
      headers['Authorization'] = `Bearer ${newToken}`
      res = await fetch(url, { ...options, headers, _retried: true })
    } catch {
      clearTokens()
      throw new ApiError(401, 'Session expired. Please log in again.')
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body.error || `Request failed (${res.status})`, body)
  }

  return res.json()
}

export class ApiError extends Error {
  constructor(status, message, body = {}) {
    super(message)
    this.status = status
    this.body = body
  }
}

// --- Auth API ---

export const authApi = {
  async login(email, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      noAuth: true,
    })
    setTokens(data.accessToken, data.refreshToken)
    return data
  },

  async register({ name, email, password, role }) {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
      noAuth: true,
    })
    setTokens(data.accessToken, data.refreshToken)
    return data
  },

  async me() {
    return apiFetch('/api/auth/me')
  },

  async changePassword(currentPassword, newPassword) {
    return apiFetch('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  },

  async logout() {
    const refreshToken = getRefreshToken()
    try {
      await apiFetch('/api/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        noAuth: true,
      })
    } catch { /* ignore */ }
    clearTokens()
  },
}

// --- ESG API ---

export const esgApi = {
  overview: () => apiFetch('/api/esg/overview'),
  environmental: () => apiFetch('/api/esg/environmental'),
  social: () => apiFetch('/api/esg/social'),
  governance: () => apiFetch('/api/esg/governance'),
  gamification: () => apiFetch('/api/esg/gamification'),
}

// --- Reports API ---

export const reportsApi = {
  list: () => apiFetch('/api/reports'),
  facilityData: (source) => apiFetch(`/api/reports/facility-data${source ? `?source=${encodeURIComponent(source)}` : ''}`),
  monthlySummary: () => apiFetch('/api/reports/monthly-summary'),
  generate: (type, format) => apiFetch('/api/reports/generate', {
    method: 'POST',
    body: JSON.stringify({ type, format }),
  }),
}

// --- Settings API ---

export const settingsApi = {
  getAll: () => apiFetch('/api/settings'),
  getOrganizations: () => apiFetch('/api/settings/organizations'),
  addOrganization: (org) => apiFetch('/api/settings/organizations', {
    method: 'POST',
    body: JSON.stringify(org),
  }),
  updateOrganization: (id, updates) => apiFetch(`/api/settings/organizations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  deleteOrganization: (id) => apiFetch(`/api/settings/organizations/${id}`, {
    method: 'DELETE',
  }),
  getConfig: () => apiFetch('/api/settings/config'),
  updateConfig: (config) => apiFetch('/api/settings/config', {
    method: 'PUT',
    body: JSON.stringify(config),
  }),
}
