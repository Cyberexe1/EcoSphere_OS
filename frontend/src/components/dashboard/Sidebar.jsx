import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV_ITEMS = [
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { icon: 'eco', label: 'Environmental', to: '/environmental' },
  { icon: 'group', label: 'Social', to: '/social' },
  { icon: 'gavel', label: 'Governance', to: '/governance' },
  { icon: 'military_tech', label: 'Gamification', to: '/gamification' },
  { icon: 'description', label: 'Reports', to: '/reports' },
  { icon: 'settings', label: 'Settings', to: '/settings' },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full flex flex-col py-6 px-4 z-50 bg-inverse-surface w-[260px] border-r border-outline-variant/20 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 px-2">
          <h2 className="text-headline-sm text-primary-fixed font-bold">EcoSphere</h2>
          <p className="text-label-md text-surface-variant opacity-70">ESG Management</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
          {NAV_ITEMS.map((item) => {
            const active = item.to && location.pathname === item.to
            const className = `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
              active
                ? 'bg-primary-container text-on-primary-container'
                : 'text-surface-variant hover:text-white hover:bg-primary/20'
            }`
            const content = (
              <>
                <Icon
                  name={item.icon}
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                />
                <span className="text-label-md">{item.label}</span>
              </>
            )

            return item.to ? (
              <Link key={item.label} to={item.to} onClick={onClose} className={className}>
                {content}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className={`${className} text-left opacity-60 cursor-not-allowed`}
                title="Coming soon"
              >
                {content}
              </button>
            )
          })}
        </nav>

        <Link
          to="/reports"
          onClick={onClose}
          className="mt-4 w-full py-3 bg-primary text-white rounded-xl text-label-md flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors"
        >
          <Icon name="add" className="text-sm" /> New Report
        </Link>

        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-1">
          <a
            href="mailto:support@ecosphere.com"
            className="flex items-center gap-3 px-3 py-2 text-surface-variant hover:text-white text-label-md"
          >
            <Icon name="help" /> Support
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-surface-variant hover:text-white text-label-md text-left"
          >
            <Icon name="logout" /> Log out
          </button>
        </div>
      </aside>
    </>
  )
}
