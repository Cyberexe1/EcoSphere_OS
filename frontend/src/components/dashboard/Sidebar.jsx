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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full flex flex-col py-6 px-4 z-50 bg-[#1a2e23] w-[270px] transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 px-3">
          <h2 className="text-xl font-extrabold text-white tracking-tight">EcoSphere</h2>
          <p className="text-xs text-white/50 mt-0.5">ESG Management Platform</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
          {NAV_ITEMS.map((item) => {
            const active = item.to && location.pathname === item.to
            const className = `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              active
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`
            const content = (
              <>
                <Icon
                  name={item.icon}
                  className="text-[20px]"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                />
                <span className="text-sm font-medium">{item.label}</span>
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
                className={`${className} text-left opacity-40 cursor-not-allowed`}
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
          className="mt-4 w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Icon name="add" className="text-[18px]" /> New Report
        </Link>

        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-0.5">
          <a
            href="mailto:support@ecosphere.com"
            className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-sm"
          >
            <Icon name="help" className="text-[20px]" /> Support
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors text-sm text-left"
          >
            <Icon name="logout" className="text-[20px]" /> Log out
          </button>
        </div>
      </aside>
    </>
  )
}
