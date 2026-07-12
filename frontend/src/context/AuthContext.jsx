import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'ecosphere.auth.user'
const USERS_KEY = 'ecosphere.auth.registered'

// Demo credentials — use these to log in.
export const DEMO_CREDENTIALS = {
  email: 'demo@ecosphere.com',
  password: 'EcoSphere@2024',
}

const DEMO_USER = {
  name: 'Sarah Jenkins',
  email: DEMO_CREDENTIALS.email,
  role: 'Chief Sustainability Officer',
}

function loadRegistered() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = (email, password) => {
    const normalized = email.trim().toLowerCase()
    if (normalized === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setUser(DEMO_USER)
      return { ok: true }
    }
    const registered = loadRegistered().find((u) => u.email === normalized)
    if (registered && registered.password === password) {
      setUser({ name: registered.name, email: registered.email, role: registered.role })
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password. Try the demo credentials below.' }
  }

  const register = ({ name, email, password, org }) => {
    const normalized = email.trim().toLowerCase()
    if (normalized === DEMO_CREDENTIALS.email) {
      return { ok: false, error: 'That email is reserved for the demo account.' }
    }
    const registered = loadRegistered()
    if (registered.some((u) => u.email === normalized)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      name,
      email: normalized,
      password,
      role: org ? `Admin · ${org}` : 'Team Member',
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([...registered, newUser]))
    return { ok: true }
  }

  const emailExists = (email) => {
    const normalized = email.trim().toLowerCase()
    return (
      normalized === DEMO_CREDENTIALS.email ||
      loadRegistered().some((u) => u.email === normalized)
    )
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, register, emailExists, logout }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
