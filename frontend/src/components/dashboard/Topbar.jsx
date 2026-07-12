import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../ui/Toast.jsx'

// Keyword → route map for the global search.
const SEARCH_INDEX = [
  { keywords: ['dashboard', 'overview', 'executive', 'home'], to: '/dashboard', label: 'Dashboard' },
  { keywords: ['environment', 'emission', 'carbon', 'co2', 'scope'], to: '/environmental', label: 'Environmental' },
  { keywords: ['social', 'csr', 'volunteer', 'diversity', 'employee'], to: '/social', label: 'Social' },
  { keywords: ['governance', 'policy', 'policies', 'compliance', 'audit', 'risk'], to: '/governance', label: 'Governance' },
  { keywords: ['gamification', 'challenge', 'badge', 'leaderboard', 'reward'], to: '/gamification', label: 'Gamification' },
  { keywords: ['report', 'analytics', 'export', 'builder'], to: '/reports', label: 'Reports' },
  { keywords: ['settings', 'config', 'organization', 'admin', 'notification'], to: '/settings', label: 'Settings' },
]

export default function Topbar({ onMenuClick, title = 'EcoSphere: ESG Management Platform' }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const q = query.trim().toLowerCase()
    if (!q) return
    const match = SEARCH_INDEX.find((item) =>
      item.keywords.some((k) => k.includes(q) || q.includes(k))
    )
    if (match) {
      navigate(match.to)
      toast(`Opening ${match.label}`, 'info')
      setQuery('')
    } else {
      toast(`No results for "${query}"`, 'warning')
    }
  }

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
        <span className="text-headline-sm md:text-headline-md font-bold text-primary truncate max-w-[220px] sm:max-w-none">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="relative hidden lg:block" role="search">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search modules… (e.g. carbon)"
            type="text"
            aria-label="Search modules"
          />
        </form>
        <button
          className="text-on-surface-variant hover:bg-surface-variant/50 p-2 rounded-full"
          aria-label="Notifications"
          onClick={() => toast('No new notifications', 'info')}
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
