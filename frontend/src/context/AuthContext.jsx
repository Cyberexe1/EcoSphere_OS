import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'ecosphere.auth.user'

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
    const matches =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    if (matches) {
      setUser(DEMO_USER)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password. Try the demo credentials below.' }
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
