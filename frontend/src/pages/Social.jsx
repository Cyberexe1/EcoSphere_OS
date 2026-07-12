import { useMemo, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/ui/Modal.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { SkeletonTable } from '../components/ui/Skeleton.jsx'
import { useToast } from '../components/ui/Toast.jsx'
import { useLocalStorageState } from '../hooks/useLocalStorageState.js'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading.js'
import { exportToCsv } from '../utils/csv.js'

const SEED_PROGRAMS = [
  {
    id: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADB2x2fu5IHbqlZQFKTXtAsLKDvZi4pgIeMHXfkrqfH2biasJJWZb5yA4JXnSRyoTpx6FXfaxjKxwdXbXfJKJuG7Rq9Wek516U7GOACA75DFlrMpNAgYDDVZXC4kQqLGipG7quIVMWfKAGCNl_BD1F3AX5LJ9xAwE2Y9DUBACAAQ_-6nV9Ge4KiT4X5_Xh0-1TK-eaOVGbNkWMtM5bnrvX9F7Ytw-nJFvI92GkZoPUegszLRH8yAmL6S-863aR8m8ZXiZWkHwunkWY',
    tag: 'Environmental',
    tagClass: 'text-primary',
    title: 'Tree Plantation Drive',
    location: 'Blackwood Forest Reserve',
    participants: 48,
    joined: false,
  },
  {
    id: 2,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgQI_diR8xB6vVgULPeXUHbSFKOXP5iE2RrspFegOJBDxaiH1CAJ2zKqcxXt9IBOkN4icp1YBt0iVDZHka8Pk4P5g446AdSqn6-SdSYMuabEU-03_AHSluL7mHWd4YsO1dGoFL4qH50cpuuoxaSJY_ZANBkm7Kv1-JI68qZkdIDodkpUMbVqe7gQGfKCPBY66wmVTLJVo8gNXtKucfakkcYXgAS6Z6BieQxlnjmmLXnmXADzIhvMSXDv65zMcBh2stt-BoE2iSnYwJ',
    tag: 'Health',
    tagClass: 'text-error',
    title: 'Blood Donation Camp',
    location: 'Corporate HQ, Hall A',
    participants: 38,
    joined: false,
  },
]

const SEED_PARTICIPATION = [
  { id: 1, employee: 'Sarah Jenkins', department: 'Engineering', activity: 'Beach Cleanup', status: 'Approved', points: 150 },
  { id: 2, employee: 'Michael Chen', department: 'Marketing', activity: 'STEM Education', status: 'Pending', points: 0 },
  { id: 3, employee: 'Elena Rodriguez', department: 'Operations', activity: 'Tree Plantation', status: 'Registered', points: 45 },
]

const STATUS_TONE = { Approved: 'success', Pending: 'pending', Registered: 'info', Rejected: 'danger' }
const EMPTY_ACTIVITY = { title: '', location: '', tag: 'Environmental' }
const POINTS_PER_APPROVAL = 100

export default function Social() {
  const toast = useToast()
  const loading = useSimulatedLoading()
  const [programs, setPrograms] = useLocalStorageState('ecosphere.social.programs', SEED_PROGRAMS)
  const [participation, setParticipation] = useLocalStorageState('ecosphere.social.participation', SEED_PARTICIPATION)

  const [search, setSearch] = useState('')
  const [activityModal, setActivityModal] = useState(false)
  const [form, setForm] = useState(EMPTY_ACTIVITY)
  const [formError, setFormError] = useState('')
  const [rejectTarget, setRejectTarget] = useState(null)

  const kpis = useMemo(
    () => [
      { icon: 'event_available', value: programs.length, label: 'CSR Activities', sub: 'Active initiatives' },
      { icon: 'groups', value: programs.reduce((s, p) => s + p.participants, 0), label: 'Participants', sub: 'Employees involved' },
      { icon: 'timer', value: '4.5k', label: 'Volunteer Hours', sub: 'Total community service' },
      { icon: 'military_tech', value: participation.reduce((s, p) => s + p.points, 0), label: 'Points Awarded', sub: 'From approvals' },
      { icon: 'diversity_3', value: '8.4', label: 'Diversity Score', sub: 'Out of 10 base index' },
      { icon: 'favorite', value: '9.1', label: 'Impact Score', sub: 'Community satisfaction' },
    ],
    [programs, participation]
  )

  const filteredParticipation = useMemo(() => {
    if (!search.trim()) return participation
    const q = search.toLowerCase()
    return participation.filter(
      (p) => p.employee.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.activity.toLowerCase().includes(q)
    )
  }, [participation, search])

  const joinActivity = (id) => {
    setPrograms((list) =>
      list.map((p) => (p.id === id ? { ...p, joined: !p.joined, participants: p.participants + (p.joined ? -1 : 1) } : p))
    )
    const p = programs.find((x) => x.id === id)
    toast(p?.joined ? 'Left activity.' : 'Joined activity — thanks for participating!', p?.joined ? 'info' : 'success')
  }

  const createActivity = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.location.trim()) {
      setFormError('Title and location are required.')
      return
    }
    setPrograms((list) => [
      {
        id: Date.now(),
        img: SEED_PROGRAMS[0].img,
        tag: form.tag,
        tagClass: form.tag === 'Health' ? 'text-error' : 'text-primary',
        title: form.title,
        location: form.location,
        participants: 0,
        joined: false,
      },
      ...list,
    ])
    toast('CSR activity created.', 'success')
    setActivityModal(false)
    setForm(EMPTY_ACTIVITY)
  }

  const approve = (id) => {
    setParticipation((list) =>
      list.map((p) => (p.id === id ? { ...p, status: 'Approved', points: p.points || POINTS_PER_APPROVAL } : p))
    )
    toast('Participation approved — points awarded.', 'success')
  }

  const confirmReject = () => {
    setParticipation((list) =>
      list.map((p) => (p.id === rejectTarget.id ? { ...p, status: 'Rejected', points: 0 } : p))
    )
    toast('Participation rejected.', 'info')
  }

  const handleExport = () => {
    exportToCsv('csr-participation', filteredParticipation, [
      { key: 'employee', label: 'Employee' },
      { key: 'department', label: 'Department' },
      { key: 'activity', label: 'CSR Activity' },
      { key: 'status', label: 'Status' },
      { key: 'points', label: 'Points' },
    ])
    toast('Exported participation to CSV.', 'info')
  }

  return (
    <DashboardLayout title="Social & CSR Management">
      <div className="space-y-gutter">
        {/* Header */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h1 className="text-display-lg text-on-surface">Social &amp; CSR</h1>
            <p className="text-body-md text-on-surface-variant">
              Community engagement, diversity &amp; employee participation.
            </p>
          </div>
          <button
            onClick={() => {
              setForm(EMPTY_ACTIVITY)
              setFormError('')
              setActivityModal(true)
            }}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-label-md hover:bg-primary/90 transition-all shadow-sm"
          >
            <Icon name="add_circle" className="text-[20px]" /> Create CSR Activity
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-[#E5EAE8] p-4 rounded-xl flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-tertiary bg-tertiary/5 p-2 rounded-lg">
                  <Icon name={kpi.icon} />
                </span>
              </div>
              <div>
                <h3 className="text-display-lg leading-none mb-1">{kpi.value}</h3>
                <p className="text-label-sm text-outline uppercase tracking-wider">{kpi.label}</p>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-2">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Programs */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-headline-sm flex items-center gap-2">
              <Icon name="volunteer_activism" className="text-primary" /> Active CSR Programs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p) => (
              <div key={p.id} className="bg-white border border-[#E5EAE8] rounded-xl overflow-hidden group">
                <div className="relative h-32 w-full overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${p.img}')` }} />
                  <span className={`absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.tagClass}`}>
                    {p.tag}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <h4 className="font-semibold text-body-lg">{p.title}</h4>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
                    <Icon name="location_on" className="text-[16px]" /> {p.location}
                  </p>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
                    <Icon name="groups" className="text-[16px]" /> {p.participants} participants
                  </p>
                  <button
                    onClick={() => joinActivity(p.id)}
                    className={`w-full py-2 rounded-lg text-label-md transition-all ${
                      p.joined
                        ? 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'
                        : 'bg-primary-container text-on-primary-container hover:opacity-90'
                    }`}
                  >
                    {p.joined ? 'Leave Activity' : 'Join Activity'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Participation table */}
        <section className="space-y-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <h2 className="text-headline-sm">Participation Tracker</h2>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2 bg-white border border-outline-variant rounded-lg px-3 py-1.5">
                <Icon name="search" className="text-outline text-[18px]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="border-none p-0 text-body-sm focus:ring-0 outline-none w-32"
                />
              </div>
              <button onClick={handleExport} className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-sm hover:bg-white transition-colors">
                Export CSV
              </button>
            </div>
          </div>
          <div className="bg-white border border-[#E5EAE8] rounded-xl overflow-hidden">
            {loading ? (
              <SkeletonTable rows={4} cols={6} />
            ) : filteredParticipation.length === 0 ? (
              <EmptyState icon="groups" title="No participation records" message="No records match your search." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-highest/50">
                    <tr>
                      {['Employee', 'Department', 'CSR Activity', 'Status', 'Points', 'Actions'].map((h, i) => (
                        <th key={h} className={`px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {filteredParticipation.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                              {p.employee.charAt(0)}
                            </div>
                            <span className="font-medium text-body-md">{p.employee}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-body-md text-on-surface-variant">{p.department}</td>
                        <td className="px-6 py-4 text-body-md">{p.activity}</td>
                        <td className="px-6 py-4">
                          <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                        </td>
                        <td className={`px-6 py-4 text-body-md font-bold ${p.points ? 'text-primary' : 'text-outline'}`}>
                          {p.points} pts
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          {p.status === 'Approved' || p.status === 'Rejected' ? (
                            <span className="text-label-sm text-outline">—</span>
                          ) : (
                            <>
                              <button
                                onClick={() => approve(p.id)}
                                className="px-2.5 py-1 text-label-sm rounded-lg text-primary hover:bg-primary/10 transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => setRejectTarget(p)}
                                className="px-2.5 py-1 text-label-sm rounded-lg text-error hover:bg-error/10 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Create activity modal */}
      <Modal
        open={activityModal}
        onClose={() => setActivityModal(false)}
        title="Create CSR Activity"
        subtitle="Launch a new community or engagement initiative."
        footer={
          <>
            <button onClick={() => setActivityModal(false)} className="px-5 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors">
              Cancel
            </button>
            <button type="submit" form="activity-form" className="px-5 py-2 rounded-lg text-label-md bg-primary text-white hover:brightness-110 transition-all">
              Create Activity
            </button>
          </>
        }
      >
        <form id="activity-form" onSubmit={createActivity} className="space-y-4">
          {formError && <p className="text-body-sm text-error bg-error/10 rounded-lg px-3 py-2">{formError}</p>}
          <label className="block space-y-1.5">
            <span className="text-label-md text-on-surface">Activity Title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="e.g. Community Beach Cleanup" />
          </label>
          <label className="block space-y-1.5">
            <span className="text-label-md text-on-surface">Location</span>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" placeholder="e.g. Marina Bay" />
          </label>
          <label className="block space-y-1.5">
            <span className="text-label-md text-on-surface">Category</span>
            <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className="input">
              <option>Environmental</option>
              <option>Health</option>
              <option>Education</option>
              <option>Community</option>
            </select>
          </label>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={confirmReject}
        title="Reject participation?"
        message={`Reject ${rejectTarget?.employee}'s participation in "${rejectTarget?.activity}"? No points will be awarded.`}
        confirmLabel="Reject"
      />
    </DashboardLayout>
  )
}
