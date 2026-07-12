import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../ui/Toast.jsx'

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
    <header className="fixed top-0 left-0 lg:left-[270px] right-0 z-30 flex justify-between items-center px-4 sm:px-6 lg:px-8 h-[72px] bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="flex items-center gap-3 lg:gap-6">
        <button
          className="lg:hidden text-on-surface-variant p-2 -ml-2 hover:bg-black/5 rounded-lg transition-colors"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Icon name="menu" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-on-surface truncate max-w-[200px] sm:max-w-none">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <form onSubmit={handleSearch} className="relative hidden md:block" role="search">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[18px]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-[#F4F7F5] border border-transparent rounded-xl text-sm w-56 lg:w-64 focus:outline-none focus:border-primary/30 focus:bg-white focus:shadow-sm transition-all placeholder:text-on-surface-variant/40"
            placeholder="Search modules… (e.g. carbon)"
            type="text"
            aria-label="Search modules"
          />
        </form>
        <button
          className="relative text-on-surface-variant hover:text-on-surface hover:bg-black/5 p-2.5 rounded-xl transition-colors"
          aria-label="Notifications"
          onClick={() => toast('No new notifications', 'info')}
        >
          <Icon name="notifications" className="text-[22px]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 ml-1 sm:ml-2 border-l border-black/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="hidden lg:block leading-tight">
            <p className="text-sm font-semibold text-on-surface">{user?.name}</p>
            <p className="text-xs text-on-surface-variant/70">{user?.role}</p>
          </div>
          <Icon name="expand_more" className="hidden lg:block text-on-surface-variant/50 text-[18px]" />
        </div>
      </div>
    </header>
  )
}
