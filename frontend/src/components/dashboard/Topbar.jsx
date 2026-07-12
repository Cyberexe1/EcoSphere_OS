import Icon from '../Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const TABS = ['Dashboard', 'Compliance', 'Analytics']

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 z-30 flex justify-between items-center px-gutter h-16 bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-4 lg:gap-8">
        <button
          className="lg:hidden text-on-surface-variant p-2 -ml-2"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Icon name="menu" />
        </button>
        <span className="text-headline-sm md:text-headline-md font-bold text-primary hidden sm:block">
          Executive ESG Overview
        </span>
        <nav className="hidden md:flex gap-6 h-full items-center">
          {TABS.map((tab, i) => (
            <a
              key={tab}
              href="#"
              className={`text-body-md px-2 py-5 transition-colors ${
                i === 0
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
          />
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search data points..."
            type="text"
          />
        </div>
        <button
          className="text-on-surface-variant hover:bg-surface-variant/50 p-2 rounded-full"
          aria-label="Notifications"
        >
          <Icon name="notifications" />
        </button>
        <div className="flex items-center gap-2 pl-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-body-sm">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="hidden xl:block leading-tight">
            <p className="text-body-sm font-semibold text-on-surface">{user?.name}</p>
            <p className="text-label-sm text-on-surface-variant">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
