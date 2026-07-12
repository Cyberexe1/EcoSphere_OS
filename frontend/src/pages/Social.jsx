import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'

const KPIS = [
  { icon: 'event_available', value: '8', label: 'CSR Activities', trend: '+2', sub: 'Active initiatives this month' },
  { icon: 'groups', value: '1.2k', label: 'Participants', trend: '12%', sub: 'Active employees involved' },
  { icon: 'timer', value: '4.5k', label: 'Volunteer Hours', trend: '450h', sub: 'Total community service' },
  { icon: 'school', value: '92%', label: 'Training Rate', trend: '5%', sub: 'Ethics & inclusion modules' },
  { icon: 'diversity_3', value: '8.4', label: 'Diversity Score', trend: 'Stable', stable: true, sub: 'Out of 10 base index' },
  { icon: 'favorite', value: '9.1', label: 'Impact Score', trend: '0.3', sub: 'Community satisfaction' },
]

const PROGRAMS = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADB2x2fu5IHbqlZQFKTXtAsLKDvZi4pgIeMHXfkrqfH2biasJJWZb5yA4JXnSRyoTpx6FXfaxjKxwdXbXfJKJuG7Rq9Wek516U7GOACA75DFlrMpNAgYDDVZXC4kQqLGipG7quIVMWfKAGCNl_BD1F3AX5LJ9xAwE2Y9DUBACAAQ_-6nV9Ge4KiT4X5_Xh0-1TK-eaOVGbNkWMtM5bnrvX9F7Ytw-nJFvI92GkZoPUegszLRH8yAmL6S-863aR8m8ZXiZWkHwunkWY',
    tag: 'Environmental',
    tagClass: 'text-primary',
    status: 'ONGOING',
    statusClass: 'bg-secondary-container text-on-secondary-container',
    title: 'Tree Plantation Drive',
    location: 'Blackwood Forest Reserve',
    progressLabel: 'Progress',
    progressValue: '75%',
    progress: 75,
    bar: 'bg-primary',
    cta: 'Join Activity',
    ctaClass: 'bg-primary-container text-on-primary-container hover:opacity-90',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgQI_diR8xB6vVgULPeXUHbSFKOXP5iE2RrspFegOJBDxaiH1CAJ2zKqcxXt9IBOkN4icp1YBt0iVDZHka8Pk4P5g446AdSqn6-SdSYMuabEU-03_AHSluL7mHWd4YsO1dGoFL4qH50cpuuoxaSJY_ZANBkm7Kv1-JI68qZkdIDodkpUMbVqe7gQGfKCPBY66wmVTLJVo8gNXtKucfakkcYXgAS6Z6BieQxlnjmmLXnmXADzIhvMSXDv65zMcBh2stt-BoE2iSnYwJ',
    tag: 'Health',
    tagClass: 'text-error',
    status: 'SCHEDULED',
    statusClass: 'bg-surface-container text-on-surface-variant',
    title: 'Blood Donation Camp',
    location: 'Corporate HQ, Hall A',
    progressLabel: 'Slots Remaining',
    progressValue: '12/50',
    progress: 24,
    bar: 'bg-error',
    cta: 'Join Activity',
    ctaClass: 'border border-outline-variant text-primary hover:bg-surface-container',
  },
]

const PARTICIPANTS = [
  { name: 'Sarah Jenkins', dept: 'Engineering', activity: 'Beach Cleanup', status: 'Approved', statusClass: 'bg-secondary-container text-on-secondary-container', points: '150 pts', pointsClass: 'text-primary' },
  { name: 'Michael Chen', dept: 'Marketing', activity: 'STEM Education', status: 'Pending', statusClass: 'bg-surface-container text-on-surface-variant', points: '0 pts', pointsClass: 'text-outline' },
  { name: 'Elena Rodriguez', dept: 'Operations', activity: 'Tree Plantation', status: 'Registered', statusClass: 'bg-tertiary-container text-on-tertiary-container', points: '45 pts', pointsClass: 'text-primary' },
]

const DEPT_ENGAGEMENT = [
  { label: 'IT & Engineering', pct: 84 },
  { label: 'Marketing & Sales', pct: 62 },
  { label: 'Human Resources', pct: 95 },
]

export default function Social() {
  return (
    <DashboardLayout title="Social & CSR Management">
      <div className="space-y-gutter">
        {/* Header actions */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h1 className="text-display-lg text-on-surface">Social &amp; CSR</h1>
            <p className="text-body-md text-on-surface-variant">
              Community engagement, diversity &amp; employee participation.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-label-md hover:bg-primary/90 transition-all shadow-sm">
            <Icon name="add_circle" className="text-[20px]" /> Create CSR Activity
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white border border-[#E5EAE8] p-4 rounded-xl flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-tertiary bg-tertiary/5 p-2 rounded-lg">
                  <Icon name={kpi.icon} />
                </span>
                <span
                  className={`text-xs font-bold flex items-center ${
                    kpi.stable ? 'text-outline' : 'text-green-600'
                  }`}
                >
                  {kpi.trend}
                  {!kpi.stable && <Icon name="arrow_drop_up" className="text-[14px]" />}
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

        {/* Programs + D&I */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <section className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-headline-sm flex items-center gap-2">
                <Icon name="volunteer_activism" className="text-primary" /> Active CSR Programs
              </h2>
              <a href="#" className="text-primary text-label-md hover:underline">
                View All Programs
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROGRAMS.map((p) => (
                <div key={p.title} className="bg-white border border-[#E5EAE8] rounded-xl overflow-hidden group">
                  <div className="relative h-32 w-full overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${p.img}')` }}
                    />
                    <span className={`absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.tagClass}`}>
                      {p.tag}
                    </span>
                    <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.statusClass}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <h4 className="font-semibold text-body-lg">{p.title}</h4>
                    <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
                      <Icon name="location_on" className="text-[16px]" /> {p.location}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-label-sm">
                        <span>{p.progressLabel}</span>
                        <span>{p.progressValue}</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-1.5">
                        <div className={`${p.bar} h-1.5 rounded-full`} style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                    <button className={`w-full py-2 rounded-lg text-label-md transition-all ${p.ctaClass}`}>
                      {p.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* D&I Analytics */}
          <aside className="lg:col-span-4 space-y-4">
            <h2 className="text-headline-sm">D&amp;I Analytics</h2>
            <div className="bg-white border border-[#E5EAE8] rounded-xl p-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-label-sm text-outline uppercase tracking-wider">Inclusion Index</p>
                  <h3 className="text-3xl font-bold text-tertiary">
                    88<span className="text-sm font-normal text-on-surface-variant">/100</span>
                  </h3>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-tertiary-container flex items-center justify-center">
                  <span className="text-xs font-bold text-tertiary">High</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-label-sm text-outline uppercase tracking-wider">Gender Diversity</p>
                <div className="h-32 flex items-center justify-center bg-surface-container-low rounded-lg border border-dashed border-outline-variant">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full border-8 border-tertiary border-t-tertiary-container" />
                    <div className="text-[11px] space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tertiary" /> 45% Women
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tertiary-container" /> 52% Men
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-outline" /> 3% Other
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-label-sm text-outline uppercase tracking-wider">
                  Dept. Diversity Heatmap
                </p>
                <div className="grid grid-cols-4 gap-1">
                  {[100, 80, 60, 40, 90, 50, 30, 10].map((o, i) => (
                    <div key={i} className="h-8 bg-tertiary rounded" style={{ opacity: o / 100 }} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Participation table */}
        <section className="space-y-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <h2 className="text-headline-sm">Participation Tracker</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-sm hover:bg-white transition-colors">
                Export CSV
              </button>
              <button className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-sm hover:bg-white transition-colors">
                Filter
              </button>
            </div>
          </div>
          <div className="bg-white border border-[#E5EAE8] rounded-xl overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-highest/50">
                <tr>
                  {['Employee', 'Department', 'CSR Activity', 'Status', 'Points', 'Actions'].map((h, i) => (
                    <th
                      key={h}
                      className={`px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider ${
                        i === 5 ? 'text-right' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {PARTICIPANTS.map((p) => (
                  <tr key={p.name} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {p.name.charAt(0)}
                        </div>
                        <span className="font-medium text-body-md">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{p.dept}</td>
                    <td className="px-6 py-4 text-body-md">{p.activity}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${p.statusClass}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-body-md font-bold ${p.pointsClass}`}>{p.points}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-outline hover:text-primary">
                        <Icon name="more_vert" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pb-4">
          <div className="bg-white border border-[#E5EAE8] p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-label-md uppercase tracking-wider text-outline">
                Participation Trends
              </h3>
              <span className="text-xs text-primary font-bold">Yearly View</span>
            </div>
            <div className="h-48 w-full bg-surface-container-low rounded-lg overflow-hidden">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 100">
                <path
                  d="M0,80 Q20,60 40,70 T80,40 T120,50 T160,20 T200,30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <path
                  d="M0,80 Q20,60 40,70 T80,40 T120,50 T160,20 T200,30 V100 H0 Z"
                  fill="rgba(16, 185, 129, 0.1)"
                />
              </svg>
            </div>
          </div>
          <div className="bg-white border border-[#E5EAE8] p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-label-md uppercase tracking-wider text-outline">
                Dept. Engagement Comparison
              </h3>
              <span className="text-xs text-tertiary font-bold">Current Quarter</span>
            </div>
            <div className="space-y-4">
              {DEPT_ENGAGEMENT.map((d) => (
                <div key={d.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{d.label}</span>
                    <span>{d.pct}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-tertiary h-2 rounded-full" style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
