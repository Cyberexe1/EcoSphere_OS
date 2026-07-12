import { useEffect } from 'react'
import Icon from '../Icon.jsx'

export default function Modal({ open, onClose, title, subtitle, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${widths[size]} bg-white rounded-2xl shadow-2xl border border-outline-variant max-h-[90vh] flex flex-col`}
      >
        <div className="flex items-start justify-between p-6 border-b border-outline-variant">
          <div>
            <h2 className="text-headline-sm text-on-surface">{title}</h2>
            {subtitle && <p className="text-body-sm text-on-surface-variant mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto hide-scrollbar">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 p-6 border-t border-outline-variant bg-surface-container-low/30 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
