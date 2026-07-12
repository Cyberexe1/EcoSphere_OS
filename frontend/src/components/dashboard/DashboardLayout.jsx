import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import DashboardFooter from './DashboardFooter.jsx'

export default function DashboardLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-[#F4F7F5] text-on-surface min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />

      <main className="lg:ml-[270px] pt-[72px] min-h-screen flex flex-col">
        <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
        <DashboardFooter />
      </main>
    </div>
  )
}
