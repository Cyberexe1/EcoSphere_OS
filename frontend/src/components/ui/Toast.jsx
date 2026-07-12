import { createContext, useCallback, useContext, useState } from 'react'
import Icon from '../Icon.jsx'

const ToastContext = createContext(null)

const TONES = {
  success: { icon: 'check_circle', class: 'text-primary', bar: 'bg-primary' },
  error: { icon: 'error', class: 'text-error', bar: 'bg-error' },
  info: { icon: 'info', class: 'text-tertiary', bar: 'bg-tertiary' },
  warning: { icon: 'warning', class: 'text-amber-600', bar: 'bg-amber-500' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message, tone = 'success') => {
      const id = Date.now() + Math.random()
      setToasts((list) => [...list, { id, message, tone }])
      setTimeout(() => dismiss(id), 3500)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => {
          const tone = TONES[t.tone] ?? TONES.info
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex items-center gap-3 bg-white border border-outline-variant rounded-xl shadow-lg overflow-hidden animate-[slideIn_0.2s_ease]"
              role="status"
            >
              <span className={`w-1 self-stretch ${tone.bar}`} />
              <Icon name={tone.icon} className={`${tone.class} ml-2`} />
              <p className="text-body-md text-on-surface flex-1 py-3">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="text-outline hover:text-on-surface p-3"
                aria-label="Dismiss notification"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx.toast
}
