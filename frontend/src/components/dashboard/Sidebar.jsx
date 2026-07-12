import { useNavigate } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV_ITEMS = [
  { icon: 'dashboard', label: 'Dashboard', active: true },
  { icon: 'eco', label: 'Environmental' },
  { icon: 'group', label: 'Social' },
  { icon: 'gavel', label: 'Governance' },
  { icon: 'military_tech', label: 'Gamification' },
  { icon: 'description', label: 'Reports' },
  { icon: 'settings', label: 'Settings' },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
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

        <nav className="flex-1 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-surface-variant hover:text-white hover:bg-primary/20'
              }`}
            >
              <Icon
                name={item.icon}
                style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              />
              <span className="text-label-md">{item.label}</span>
            </a>
          ))}
        </nav>

        <button className="mt-4 w-full py-3 bg-primary text-white rounded-xl text-label-md flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors">
          <Icon name="add" className="text-sm" /> New Report
        </button>

        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-1">
          <a
            href="#"
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
