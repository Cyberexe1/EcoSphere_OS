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
      <div className="flex flex-wrap gap-4 justify-between items-end mb-8">
        <div>
          <h1 className="text-display-lg text-on-surface mb-1">Executive Overview</h1>
          <p className="text-body-lg text-on-surface-variant">
            Real-time performance metrics across global ESG standards.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setRangeOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={rangeOpen}
              className="px-4 py-2 border border-outline-variant rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center gap-2"
            >
              <Icon name="calendar_today" /> {range}
              <Icon name="expand_more" className="text-[18px]" />
            </button>
            {rangeOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 w-48 bg-white border border-outline-variant rounded-xl shadow-lg py-1 z-20"
              >
                {RANGES.map((r) => (
                  <li key={r}>
                    <button
                      role="option"
                      aria-selected={r === range}
                      onClick={() => selectRange(r)}
                      className={`w-full text-left px-4 py-2 text-body-sm hover:bg-surface-container-low transition-colors ${
                        r === range ? 'text-primary font-semibold' : 'text-on-surface'
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
            className="px-4 py-2 bg-primary text-white rounded-lg text-label-md hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Icon name="download" /> Export PDF
          </button>
        </div>
      </div>

      <ScoreCards />
      <ChartsSection />
      <ActivitySection />
    </DashboardLayout>
  )
}
