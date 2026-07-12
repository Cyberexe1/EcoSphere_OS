import { useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar.jsx'
import Topbar from '../components/dashboard/Topbar.jsx'
import ScoreCards from '../components/dashboard/ScoreCards.jsx'
import ChartsSection from '../components/dashboard/ChartsSection.jsx'
import ActivitySection from '../components/dashboard/ActivitySection.jsx'
import DashboardFooter from '../components/dashboard/DashboardFooter.jsx'
import Icon from '../components/Icon.jsx'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-[#F6F9F7] text-on-surface min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <main className="lg:ml-[260px] pt-16 min-h-screen">
        <div className="max-w-[1440px] mx-auto p-container-padding">
          {/* Page header */}
          <div className="flex flex-wrap gap-4 justify-between items-end mb-8">
            <div>
              <h1 className="text-display-lg text-on-surface mb-1">Executive Overview</h1>
              <p className="text-body-lg text-on-surface-variant">
                Real-time performance metrics across global ESG standards.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center gap-2">
                <Icon name="calendar_today" /> Last 30 Days
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-label-md hover:opacity-90 transition-opacity flex items-center gap-2">
                <Icon name="download" /> Export PDF
              </button>
            </div>
          </div>

          <ScoreCards />
          <ChartsSection />
          <ActivitySection />
        </div>

        <DashboardFooter />
      </main>
    </div>
  )
}
