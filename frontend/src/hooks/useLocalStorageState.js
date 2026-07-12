import { useEffect, useState } from 'react'

// Persistent state backed by localStorage. Falls back to `initial` when empty.
export function useLocalStorageState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore quota errors */
    }
  }, [key, value])

  return [value, setValue]
}
