import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'

const KPIS = [
  { label: 'Active Policies', icon: 'verified', iconClass: 'text-primary', value: '24', note: '+2', noteClass: 'text-primary', noteIcon: 'trending_up' },
  { label: 'Pending Ack.', icon: 'pending_actions', iconClass: 'text-gov-accent', value: '142', note: 'Overdue', noteClass: 'text-error', noteIcon: 'schedule' },
  { label: 'Open Issues', icon: 'warning', iconClass: 'text-error', value: '12', note: '8 Critical', noteClass: 'text-on-surface-variant' },
  { label: 'Upcoming Audits', icon: 'event_note', iconClass: 'text-tertiary', value: '03', note: 'Next: 12 Oct', noteClass: 'text-on-surface-variant' },
]

const TABS = [
  { id: 'policies', label: 'ESG Policies' },
  { id: 'acks', label: 'Acknowledgements' },
  { id: 'audits', label: 'Internal Audits' },
  { id: 'compliance', label: 'Compliance Kanban' },
]

const POLICIES = [
  { name: 'Anti-Bribery & Corruption', cat: 'Ethics', catClass: 'bg-secondary-container text-on-secondary-container', version: 'v2.4', status: 'Active', dot: 'bg-primary', progress: 92, bar: 'bg-primary' },
  { name: 'Environmental Impact Charter', cat: 'Eco', catClass: 'bg-primary-container text-on-primary-container', version: 'v1.1', status: 'Active', dot: 'bg-primary', progress: 78, bar: 'bg-primary' },
  { name: 'Supply Chain Labor Ethics', cat: 'Social', catClass: 'bg-tertiary-container text-on-tertiary-container', version: 'v3.0', status: 'Reviewing', dot: 'bg-gov-accent', progress: 45, bar: 'bg-gov-accent' },
]

const KANBAN = [
  {
    title: 'Open',
    count: 4,
    cards: [
      { priority: 'Critical', priorityClass: 'bg-error/10 text-error', text: 'Water usage report discrepancy in HQ-4', due: 'Due: 22 Sep' },
    ],
  },
  {
    title: 'Investigating',
    count: 2,
    cards: [
      { priority: 'Medium', priorityClass: 'bg-gov-accent/10 text-gov-accent', text: 'Onboarding diversity module incomplete', due: 'Due: 30 Sep' },
    ],
  },
  { title: 'Resolved', count: 12, cards: [] },
  { title: 'Closed', count: 86, cards: [] },
]

const ACTIVITY = [
  { dot: 'bg-primary', text: 'Internal Audit #092 Completed', time: '14 mins ago' },
  { dot: 'bg-gov-accent', text: 'New Policy Published: Ethics v2.4', time: '3 hours ago' },
  { dot: 'bg-error', text: 'Non-compliance flag in Logistics', time: 'Yesterday' },
]

const ACCEPTANCE_BARS = [
  { h: 'h-[40%]', c: 'bg-primary/20' },
  { h: 'h-[65%]', c: 'bg-primary/20' },
  { h: 'h-[55%]', c: 'bg-primary/20' },
  { h: 'h-[80%]', c: 'bg-primary/20' },
  { h: 'h-[92%]', c: 'bg-primary' },
]

const DISTRIBUTION = [
  { label: 'Environmental', pct: 42, bar: 'bg-primary' },
  { label: 'Social & Labor', pct: 31, bar: 'bg-tertiary' },
  { label: 'Finance & Legal', pct: 27, bar: 'bg-gov-accent' },
]

export default function Governance() {
  const [activeTab, setActiveTab] = useState('policies')

  return (
    <DashboardLayout title="EcoSphere: ESG Management Platform">
      <div className="space-y-card-gap">
        {/* Page header */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h1 className="text-display-lg text-on-surface">Governance</h1>
            <p className="text-on-surface-variant text-body-md">
              Policies, Audits &amp; Compliance Management
            </p>
          </div>
          <button className="bg-gov-accent text-white px-6 py-2.5 rounded-xl text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-gov-accent/20">
            <Icon name="add_circle" /> Generate Report
          </button>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 flex flex-col justify-between h-32"
            >
              <div className="flex items-start justify-between">
                <span className="text-on-surface-variant text-label-md uppercase tracking-wider">
                  {kpi.label}
                </span>
                <Icon name={kpi.icon} className={kpi.iconClass} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-display-lg font-semibold">{kpi.value}</span>
                <span className={`text-label-sm flex items-center font-bold ${kpi.noteClass}`}>
                  {kpi.noteIcon && <Icon name={kpi.noteIcon} className="text-xs" />} {kpi.note}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main layout: workspace + insight panel */}
        <div className="flex flex-col xl:flex-row gap-gutter items-start">
          {/* Workspace */}
          <div className="flex-1 w-full min-w-0 space-y-6">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden min-h-[600px]">
              {/* Tab headers */}
              <div className="flex items-center border-b border-outline-variant/30 px-2 sm:px-6 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-6 py-4 text-label-md whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-gov-accent text-gov-accent'
                        : 'border-transparent text-on-surface-variant hover:text-gov-accent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Policies tab */}
              {activeTab === 'policies' && (
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <h3 className="text-headline-sm">Active Governance Framework</h3>
                    <button className="bg-gov-accent text-white px-4 py-2 rounded-lg text-body-sm font-semibold hover:opacity-90">
                      Publish New Policy
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-widest">
                        <tr>
                          {['Policy Name', 'Category', 'Version', 'Status', 'Progress'].map((h) => (
                            <th key={h} className="p-4 border-b border-outline-variant/30 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-body-md">
                        {POLICIES.map((p) => (
                          <tr
                            key={p.name}
                            className="hover:bg-surface-container-lowest transition-colors border-b border-outline-variant/10"
                          >
                            <td className="p-4 font-medium">{p.name}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${p.catClass}`}>
                                {p.cat}
                              </span>
                            </td>
                            <td className="p-4 text-on-surface-variant">{p.version}</td>
                            <td className="p-4">
                              <span className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                                {p.status}
                              </span>
                            </td>
                            <td className="p-4 min-w-[120px]">
                              <div className="w-full bg-outline-variant/20 h-1.5 rounded-full">
                                <div className={`${p.bar} h-1.5 rounded-full`} style={{ width: `${p.progress}%` }} />
                              </div>
                              <span className="text-[10px] text-on-surface-variant mt-1 block text-right">
                                {p.progress}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Compliance Kanban tab */}
              {activeTab === 'compliance' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {KANBAN.map((col) => (
                      <div key={col.title} className="space-y-4">
                        <h4 className="text-label-md text-on-surface-variant uppercase flex justify-between">
                          {col.title} <span>{col.count}</span>
                        </h4>
                        {col.cards.map((card, i) => (
                          <div
                            key={i}
                            className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-3 cursor-pointer hover:shadow-md transition-all"
                          >
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${card.priorityClass}`}>
                              {card.priority}
                            </span>
                            <p className="font-medium text-body-md">{card.text}</p>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-[10px] text-on-surface-variant">{card.due}</span>
                              <div className="w-6 h-6 rounded-full bg-gov-accent/20 flex items-center justify-center">
                                <Icon name="person" className="text-gov-accent text-[14px]" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'acks' && (
                <div className="p-6 text-on-surface-variant italic">
                  Acknowledgement search functionality content goes here.
                </div>
              )}
              {activeTab === 'audits' && (
                <div className="p-6 text-on-surface-variant italic">
                  Audits grid view content goes here.
                </div>
              )}
            </div>
          </div>

          {/* Insight panel */}
          <aside className="w-full xl:w-80 shrink-0 space-y-card-gap">
            {/* Compliance gauge */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
              <h4 className="text-label-md uppercase tracking-wider mb-4">Compliance Health</h4>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle
                    className="text-outline-variant/20"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                  />
                  <circle
                    className="text-gov-accent"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="70"
                    stroke="currentColor"
                    strokeDasharray="440"
                    strokeDashoffset="66"
                    strokeWidth="12"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-display-lg text-gov-accent leading-none">85</p>
                  <p className="text-[10px] font-bold uppercase text-on-surface-variant">Optimal</p>
                </div>
              </div>
              <p className="text-body-sm text-center mt-4 text-on-surface-variant">
                Compliance score increased by 4% since last audit period.
              </p>
            </div>

            {/* Recent activity */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
              <h4 className="text-label-md uppercase tracking-wider mb-6">Recent Activity</h4>
              <div className="space-y-6">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-4 h-4 rounded-full mt-1 border-2 border-white ${a.dot}`} />
                    <div className="flex-1">
                      <p className="text-body-sm font-medium">{a.text}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pb-12">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-label-md uppercase tracking-wider">Policy Acceptance Trend</h4>
              <Icon name="more_horiz" className="text-on-surface-variant" />
            </div>
            <div className="h-48 flex items-end gap-2 px-2">
              {ACCEPTANCE_BARS.map((bar, i) => (
                <div key={i} className={`flex-1 rounded-t-lg transition-all ${bar.c} ${bar.h}`} />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant uppercase font-bold px-2">
              {['May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-label-md uppercase tracking-wider">Issue Distribution</h4>
              <Icon name="info" className="text-on-surface-variant" />
            </div>
            <div className="h-48 flex items-center justify-center">
              <div className="flex flex-col gap-4 w-full">
                {DISTRIBUTION.map((d) => (
                  <div key={d.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-bold">
                      <span>{d.label}</span>
                      <span>{d.pct}%</span>
                    </div>
                    <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                      <div className={`${d.bar} h-full`} style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
