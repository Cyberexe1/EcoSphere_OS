import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/ui/Modal.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useToast } from '../components/ui/Toast.jsx'
import { useLocalStorageState } from '../hooks/useLocalStorageState.js'

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

const CATEGORY_STYLES = {
  Ethics: 'bg-secondary-container text-on-secondary-container',
  Eco: 'bg-primary-container text-on-primary-container',
  Social: 'bg-tertiary-container text-on-tertiary-container',
  Finance: 'bg-outline-variant/40 text-on-surface',
}

const SEED_POLICIES = [
  { id: 1, name: 'Anti-Bribery & Corruption', cat: 'Ethics', version: 'v2.4', status: 'Active', progress: 92 },
  { id: 2, name: 'Environmental Impact Charter', cat: 'Eco', version: 'v1.1', status: 'Active', progress: 78 },
  { id: 3, name: 'Supply Chain Labor Ethics', cat: 'Social', version: 'v3.0', status: 'Reviewing', progress: 45 },
]

const SEED_ACKS = [
  { id: 1, employee: 'Priya Nair', policy: 'Anti-Bribery & Corruption', dept: 'Finance', due: '18 Oct', status: 'Pending' },
  { id: 2, employee: 'Tom Becker', policy: 'Environmental Impact Charter', dept: 'Operations', due: '12 Oct', status: 'Overdue' },
  { id: 3, employee: 'Aisha Khan', policy: 'Supply Chain Labor Ethics', dept: 'Procurement', due: '25 Oct', status: 'Acknowledged' },
]

const AUDITS = [
  { id: 1, name: 'Q3 Emissions Data Audit', scope: 'Environmental', auditor: 'KPMG', date: '12 Oct 2024', status: 'Scheduled' },
  { id: 2, name: 'Labor Practices Review', scope: 'Social', auditor: 'Internal', date: '28 Oct 2024', status: 'Scheduled' },
  { id: 3, name: 'Board Governance Audit', scope: 'Governance', auditor: 'Deloitte', date: '02 Sep 2024', status: 'Completed' },
]

const KANBAN = [
  { title: 'Open', count: 4, cards: [{ priority: 'Critical', priorityClass: 'bg-error/10 text-error', text: 'Water usage report discrepancy in HQ-4', due: 'Due: 22 Sep' }] },
  { title: 'Investigating', count: 2, cards: [{ priority: 'Medium', priorityClass: 'bg-gov-accent/10 text-gov-accent', text: 'Onboarding diversity module incomplete', due: 'Due: 30 Sep' }] },
  { title: 'Resolved', count: 12, cards: [] },
  { title: 'Closed', count: 86, cards: [] },
]

const ACTIVITY = [
  { dot: 'bg-primary', text: 'Internal Audit #092 Completed', time: '14 mins ago' },
  { dot: 'bg-gov-accent', text: 'New Policy Published: Ethics v2.4', time: '3 hours ago' },
  { dot: 'bg-error', text: 'Non-compliance flag in Logistics', time: 'Yesterday' },
]

const ACCEPTANCE_BARS = ['h-[40%]', 'h-[65%]', 'h-[55%]', 'h-[80%]', 'h-[92%]']
const DISTRIBUTION = [
  { label: 'Environmental', pct: 42, bar: 'bg-primary' },
  { label: 'Social & Labor', pct: 31, bar: 'bg-tertiary' },
  { label: 'Finance & Legal', pct: 27, bar: 'bg-gov-accent' },
]

const EMPTY_POLICY = { name: '', cat: 'Ethics', version: 'v1.0' }

export default function Governance() {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('policies')
  const [policies, setPolicies] = useLocalStorageState('ecosphere.governance.policies', SEED_POLICIES)
  const [acks, setAcks] = useLocalStorageState('ecosphere.governance.acks', SEED_ACKS)
  const [publishOpen, setPublishOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_POLICY)

  const handlePublish = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast('Policy name is required.', 'error')
      return
    }
    setPolicies((list) => [
      { id: Date.now(), name: form.name.trim(), cat: form.cat, version: form.version, status: 'Reviewing', progress: 0 },
      ...list,
    ])
    setPublishOpen(false)
    setForm(EMPTY_POLICY)
    toast('Policy published and sent for review.', 'success')
  }

  const sendReminder = (ack) => {
    toast(`Reminder sent to ${ack.employee}.`, 'success')
  }

  const markAcknowledged = (id) => {
    setAcks((list) => list.map((a) => (a.id === id ? { ...a, status: 'Acknowledged' } : a)))
    toast('Marked as acknowledged.', 'success')
  }

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
          <button
            onClick={() => toast('Governance report generated.', 'success')}
            className="bg-gov-accent text-white px-6 py-2.5 rounded-xl text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-gov-accent/20"
          >
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

        {/* Main layout */}
        <div className="flex flex-col xl:flex-row gap-gutter items-start">
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
                    <button
                      onClick={() => setPublishOpen(true)}
                      className="bg-gov-accent text-white px-4 py-2 rounded-lg text-body-sm font-semibold hover:opacity-90"
                    >
                      Publish New Policy
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-widest">
                        <tr>
                          {['Policy Name', 'Category', 'Version', 'Status', 'Progress'].map((h) => (
                            <th key={h} scope="col" className="p-4 border-b border-outline-variant/30 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-body-md">
                        {policies.map((p) => (
                          <tr key={p.id} className="hover:bg-surface-container-lowest transition-colors border-b border-outline-variant/10">
                            <td className="p-4 font-medium">{p.name}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${CATEGORY_STYLES[p.cat] ?? CATEGORY_STYLES.Finance}`}>
                                {p.cat}
                              </span>
                            </td>
                            <td className="p-4 text-on-surface-variant">{p.version}</td>
                            <td className="p-4">
                              <span className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${p.status === 'Active' ? 'bg-primary' : 'bg-gov-accent'}`} />
                                {p.status}
                              </span>
                            </td>
                            <td className="p-4 min-w-[120px]">
                              <div className="w-full bg-outline-variant/20 h-1.5 rounded-full">
                                <div className={`${p.status === 'Active' ? 'bg-primary' : 'bg-gov-accent'} h-1.5 rounded-full`} style={{ width: `${p.progress}%` }} />
                              </div>
                              <span className="text-[10px] text-on-surface-variant mt-1 block text-right">{p.progress}%</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Acknowledgements tab */}
              {activeTab === 'acks' && (
                <div className="p-6">
                  <h3 className="text-headline-sm mb-6">Policy Acknowledgements</h3>
                  {acks.length === 0 ? (
                    <EmptyState icon="task_alt" title="All caught up" message="No pending acknowledgements right now." />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-widest">
                          <tr>
                            {['Employee', 'Policy', 'Department', 'Due', 'Status', ''].map((h) => (
                              <th key={h} scope="col" className="p-4 border-b border-outline-variant/30 font-semibold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-body-md">
                          {acks.map((a) => (
                            <tr key={a.id} className="hover:bg-surface-container-lowest transition-colors border-b border-outline-variant/10">
                              <td className="p-4 font-medium">{a.employee}</td>
                              <td className="p-4 text-on-surface-variant">{a.policy}</td>
                              <td className="p-4 text-on-surface-variant">{a.dept}</td>
                              <td className="p-4 text-on-surface-variant">{a.due}</td>
                              <td className="p-4">
                                <Badge tone={a.status === 'Acknowledged' ? 'success' : a.status === 'Overdue' ? 'danger' : 'pending'}>
                                  {a.status}
                                </Badge>
                              </td>
                              <td className="p-4 text-right">
                                {a.status === 'Acknowledged' ? (
                                  <span className="text-primary text-label-sm">✓ Done</span>
                                ) : (
                                  <div className="flex gap-2 justify-end">
                                    <button onClick={() => sendReminder(a)} className="text-tertiary text-label-md hover:underline">
                                      Remind
                                    </button>
                                    <button onClick={() => markAcknowledged(a.id)} className="text-primary text-label-md hover:underline">
                                      Mark done
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Internal Audits tab */}
              {activeTab === 'audits' && (
                <div className="p-6">
                  <h3 className="text-headline-sm mb-6">Internal Audit Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AUDITS.map((a) => (
                      <div key={a.id} className="border border-outline-variant/40 rounded-xl p-5 hover:border-gov-accent/40 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gov-accent/10 flex items-center justify-center text-gov-accent">
                            <Icon name="fact_check" />
                          </div>
                          <Badge tone={a.status === 'Completed' ? 'success' : 'info'}>{a.status}</Badge>
                        </div>
                        <h4 className="font-semibold text-body-lg">{a.name}</h4>
                        <div className="mt-3 space-y-1 text-body-sm text-on-surface-variant">
                          <p className="flex items-center gap-2"><Icon name="category" className="text-[16px]" /> {a.scope}</p>
                          <p className="flex items-center gap-2"><Icon name="badge" className="text-[16px]" /> {a.auditor}</p>
                          <p className="flex items-center gap-2"><Icon name="event" className="text-[16px]" /> {a.date}</p>
                        </div>
                      </div>
                    ))}
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
                          <div key={i} className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-3">
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
            </div>
          </div>

          {/* Insight panel */}
          <aside className="w-full xl:w-80 shrink-0 space-y-card-gap">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
              <h4 className="text-label-md uppercase tracking-wider mb-4">Compliance Health</h4>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle className="text-outline-variant/20" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12" />
                  <circle className="text-gov-accent" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="66" strokeWidth="12" />
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
              {ACCEPTANCE_BARS.map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-lg ${i === ACCEPTANCE_BARS.length - 1 ? 'bg-primary' : 'bg-primary/20'} ${h}`} />
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

      {/* Publish policy modal */}
      <Modal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        title="Publish New Policy"
        subtitle="New policies start in Reviewing status."
        footer={
          <>
            <button onClick={() => setPublishOpen(false)} className="px-5 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant">
              Cancel
            </button>
            <button onClick={handlePublish} className="px-5 py-2 rounded-lg text-label-md text-white bg-gov-accent hover:opacity-90">
              Publish
            </button>
          </>
        }
      >
        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1.5">Policy name</label>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full h-11 rounded-xl border border-outline-variant px-3 text-body-md focus:outline-none focus:ring-2 focus:ring-gov-accent/30 focus:border-gov-accent"
              placeholder="e.g. Data Privacy Standard"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md text-on-surface-variant mb-1.5">Category</label>
              <select
                value={form.cat}
                onChange={(e) => setForm((f) => ({ ...f, cat: e.target.value }))}
                className="w-full h-11 rounded-xl border border-outline-variant px-3 text-body-md focus:outline-none focus:ring-2 focus:ring-gov-accent/30"
              >
                <option>Ethics</option>
                <option>Eco</option>
                <option>Social</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-label-md text-on-surface-variant mb-1.5">Version</label>
              <input
                value={form.version}
                onChange={(e) => setForm((f) => ({ ...f, version: e.target.value }))}
                className="w-full h-11 rounded-xl border border-outline-variant px-3 text-body-md focus:outline-none focus:ring-2 focus:ring-gov-accent/30 focus:border-gov-accent"
                placeholder="v1.0"
              />
            </div>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}
