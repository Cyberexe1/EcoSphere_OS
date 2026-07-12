import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { authApi, clearTokens, getAccessToken } from '../utils/api.js'

const AuthContext = createContext(null)

const STORAGE_KEY = 'ecosphere.auth.user'

// Demo credentials — use these to log in.
export const DEMO_CREDENTIALS = {
  email: 'demo@ecosphere.com',
  password: 'EcoSphere@2024',
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
  const [loading, setLoading] = useState(false)

  // Persist user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  // On mount, verify token is still valid
  useEffect(() => {
    const token = getAccessToken()
    if (token && user) {
      authApi.me().then((data) => {
        setUser(data.user)
      }).catch(() => {
        // Token invalid — clear session
        setUser(null)
        clearTokens()
      })
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await authApi.login(email, password)
      setUser(data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message || 'Invalid email or password.' }
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async ({ name, email, password, role }) => {
    setLoading(true)
    try {
      const data = await authApi.register({ name, email, password, role })
      setUser(data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message || 'Registration failed.' }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
