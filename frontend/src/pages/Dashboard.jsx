import { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import ScoreCards from '../components/dashboard/ScoreCards.jsx'
import ChartsSection from '../components/dashboard/ChartsSection.jsx'
import ActivitySection from '../components/dashboard/ActivitySection.jsx'
import Icon from '../components/Icon.jsx'
import { useToast } from '../components/ui/Toast.jsx'

const RANGES = ['Last 7 Days', 'Last 30 Days', 'Last Quarter', 'Year to Date', 'All Time']

export default function Dashboard() {
  const toast = useToast()
  const [range, setRange] = useState('Last 30 Days')
  const [rangeOpen, setRangeOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setRangeOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const selectRange = (r) => {
    setRange(r)
    setRangeOpen(false)
    toast(`Showing data for: ${r}`, 'info')
  }

  const handleExport = () => {
    toast('Preparing PDF… use your browser dialog to save.', 'info')
    setTimeout(() => window.print(), 300)
  }

  return (
    <DashboardLayout title="Executive ESG Overview">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-5 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Executive Overview</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Real-time performance metrics across global ESG standards.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none" ref={menuRef}>
            <button
              onClick={() => setRangeOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={rangeOpen}
              className="w-full sm:w-auto px-3 py-2 bg-white border border-black/[0.06] rounded-lg text-xs font-medium text-on-surface-variant hover:border-primary/30 hover:shadow-sm transition-all flex items-center justify-center sm:justify-start gap-1.5"
            >
              <Icon name="calendar_today" className="text-[16px]" />
              <span className="hidden sm:inline">{range}</span>
              <span className="sm:hidden">{range.replace('Last ', '')}</span>
              <Icon name="expand_more" className="text-[16px] ml-auto sm:ml-0" />
            </button>
            {rangeOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-1.5 w-44 bg-white border border-black/[0.06] rounded-xl shadow-lg py-1 z-20"
              >
                {RANGES.map((r) => (
                  <li key={r}>
                    <button
                      role="option"
                      aria-selected={r === range}
                      onClick={() => selectRange(r)}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-black/[0.03] transition-colors ${
                        r === range ? 'text-primary font-semibold bg-primary/5' : 'text-on-surface'
                      }`}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white rounded-lg text-xs font-semibold hover:shadow-md hover:shadow-primary/20 transition-all flex items-center gap-1.5"
          >
            <Icon name="download" className="text-[16px]" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      <ScoreCards />
      <ChartsSection />
      <ActivitySection />
    </DashboardLayout>
  )
}
