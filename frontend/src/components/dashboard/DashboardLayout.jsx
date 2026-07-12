import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import DashboardFooter from './DashboardFooter.jsx'

export default function DashboardLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-[#F6F9F7] text-on-surface min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />

      <main className="lg:ml-[260px] pt-16 min-h-screen flex flex-col">
        <div className="flex-1 max-w-[1440px] w-full mx-auto p-container-padding">{children}</div>
        <DashboardFooter />
      </main>
    </div>
  )
}
