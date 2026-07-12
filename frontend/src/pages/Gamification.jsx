import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'

const CATEGORIES = [
  { label: 'All Challenges', icon: null, active: true },
  { label: 'Energy', icon: 'bolt' },
  { label: 'Waste', icon: 'delete_outline' },
  { label: 'Water', icon: 'water_drop' },
  { label: 'Transport', icon: 'commute' },
  { label: 'Community', icon: 'diversity_3' },
]

const CHALLENGES = [
  {
    accent: 'bg-accent-orange',
    badge: 'Active • 12 Days Left',
    badgeClass: 'bg-secondary-container/30 text-secondary',
    icon: 'trending_up',
    iconHover: 'group-hover:text-accent-orange',
    title: 'Sustainability Sprint',
    desc: 'A company-wide race to reduce individual carbon footprints by 15% through smart commuting and energy habits.',
    goal: 'Goal: 5,000kg CO2',
    percent: 68,
    percentClass: 'text-accent-orange',
    bar: 'bg-accent-orange',
    cta: 'Join Challenge',
    ctaClass: 'bg-accent-orange text-on-accent-orange hover:shadow-lg',
  },
  {
    accent: 'bg-primary',
    badge: 'Starts in 3 Days',
    badgeClass: 'bg-surface-container-high text-on-surface-variant',
    icon: 'recycling',
    iconHover: 'group-hover:text-primary',
    title: 'Zero-Waste Quarter',
    desc: "Transform office operations to achieve 90% waste diversion. Earn the 'Circular Master' badge upon completion.",
    goal: 'Goal: 90% Diversion',
    percent: 0,
    percentClass: 'text-outline',
    bar: 'bg-outline-variant',
    cta: 'Remind Me',
    ctaClass: 'border border-accent-orange text-accent-orange hover:bg-accent-orange/5',
  },
  {
    accent: 'bg-tertiary',
    badge: 'Ongoing • Seasonal',
    badgeClass: 'bg-secondary-container/30 text-secondary',
    icon: 'water_lux',
    iconHover: 'group-hover:text-tertiary',
    title: 'Aqua Conservation',
    desc: 'Departmental competition to reduce water usage in facilities by optimizing cooling and irrigation systems.',
    goal: 'Goal: 200k Liters',
    percent: 42,
    percentClass: 'text-tertiary',
    bar: 'bg-tertiary',
    cta: 'Join Challenge',
    ctaClass: 'bg-accent-orange text-on-accent-orange hover:shadow-lg',
  },
]

const BADGES = [
  { icon: 'eco', label: 'Green Leader', ring: 'border-primary', bg: 'bg-primary-container/20', fill: 'bg-primary' },
  { icon: 'light_mode', label: 'Energy Saver', ring: 'border-tertiary', bg: 'bg-tertiary-container/20', fill: 'bg-tertiary' },
  { icon: 'group', label: 'Community Hero', locked: true },
  { icon: 'bolt', label: 'Efficiency Pro', ring: 'border-accent-orange', bg: 'bg-accent-orange/20', fill: 'bg-accent-orange' },
  { icon: 'public', label: 'Global Impact', ring: 'border-secondary', bg: 'bg-secondary-container/20', fill: 'bg-secondary' },
  { icon: 'auto_awesome', label: 'Innovator', ring: 'border-on-surface-variant', bg: 'bg-on-surface-variant/10', fill: 'bg-on-surface-variant' },
]

const LEADERBOARD = [
  { rank: 1, rankClass: 'bg-yellow-400/20 text-yellow-700', icon: 'engineering', name: 'Engineering Dept.', meta: '42 Active Members', points: '12,450 pts', trend: '+4%', up: true },
  { rank: 2, rankClass: 'bg-slate-300/40 text-slate-700', icon: 'campaign', name: 'Marketing Global', meta: '28 Active Members', points: '11,820 pts', trend: '+12%', up: true },
  { rank: 3, rankClass: 'bg-amber-600/20 text-amber-900', icon: 'payments', name: 'Finance Operations', meta: '15 Active Members', points: '9,640 pts', trend: '-2%', up: false },
]

export default function Gamification() {
  return (
    <DashboardLayout title="EcoSphere: ESG Management Platform">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-end mb-8">
        <div>
          <h1 className="text-display-lg text-on-surface mb-2">Impact Challenges</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Drive sustainability through healthy competition. Engage your teams in meaningful
            environmental action and earn recognition for your green milestones.
          </p>
        </div>
        <button className="bg-accent-orange hover:bg-accent-orange/90 text-on-accent-orange text-label-md py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2">
          <Icon name="add" className="text-lg" style={{ fontVariationSettings: "'FILL' 1" }} />
          Create Challenge
        </button>
      </div>

      {/* Category chips */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            className={`text-label-md px-6 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${
              cat.active
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-variant/30'
            }`}
          >
            {cat.icon && <Icon name={cat.icon} className="text-sm text-primary" />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Challenge cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap mb-12">
        {CHALLENGES.map((c) => (
          <div
            key={c.title}
            className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col hover:border-accent-orange/50 transition-all eco-shadow group relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full ${c.accent} opacity-80`} />
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-lg text-label-sm ${c.badgeClass}`}>{c.badge}</div>
              <Icon
                name={c.icon}
                className={`text-on-surface-variant transition-colors ${c.iconHover}`}
              />
            </div>
            <h3 className="text-headline-sm mb-2">{c.title}</h3>
            <p className="text-body-md text-on-surface-variant mb-6 flex-1">{c.desc}</p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-label-md">
                <span>{c.goal}</span>
                <span className={c.percentClass}>{c.percent}%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className={`${c.bar} h-2 rounded-full`} style={{ width: `${c.percent}%` }} />
              </div>
            </div>
            <button
              className={`w-full text-label-md py-3 rounded-lg transition-all active:scale-[0.98] ${c.ctaClass}`}
            >
              {c.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="mb-12 bg-white border border-outline-variant rounded-xl p-8 eco-shadow">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <h3 className="text-headline-md flex items-center gap-3">
            <Icon
              name="workspace_premium"
              className="text-accent-orange"
              style={{ fontVariationSettings: "'FILL' 1" }}
            />
            Badges Earned
          </h3>
          <a href="#" className="text-primary text-label-md hover:underline">
            View All Achievement Hall
          </a>
        </div>
        <div className="flex items-center gap-10 overflow-x-auto pb-4">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className={`flex flex-col items-center gap-3 group shrink-0 ${
                b.locked ? 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100' : ''
              }`}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center p-1 transition-transform group-hover:scale-110 ${
                  b.locked ? 'bg-surface-variant' : `${b.bg} border-2 border-dashed ${b.ring}`
                }`}
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center text-white shadow-lg ${
                    b.locked ? 'bg-outline-variant text-on-surface-variant' : b.fill
                  }`}
                >
                  <Icon name={b.icon} className="text-3xl" />
                </div>
              </div>
              <span className="text-label-md text-center">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <section className="bg-white border border-outline-variant rounded-xl overflow-hidden eco-shadow">
        <div className="p-8 border-b border-outline-variant flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h3 className="text-headline-md">Global Leaderboard</h3>
            <p className="text-body-md text-on-surface-variant">
              Top performing departments and teams this quarter.
            </p>
          </div>
          <div className="flex border border-outline-variant rounded-lg overflow-hidden">
            <button className="px-4 py-2 bg-surface-variant/50 text-primary text-label-md border-r border-outline-variant">
              Teams
            </button>
            <button className="px-4 py-2 hover:bg-surface-variant/30 text-on-surface-variant text-label-md">
              Individuals
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-variant/20">
              <tr className="text-on-surface-variant text-label-md border-b border-outline-variant">
                {['Rank', 'User / Team', 'Impact Points', 'Trend', 'Action'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-8 py-4 font-semibold uppercase tracking-wider ${
                      i === 4 ? 'text-right' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {LEADERBOARD.map((r) => (
                <LeaderRow key={r.rank} {...r} />
              ))}
              {/* Current user */}
              <tr className="bg-primary/5 border-l-4 border-primary">
                <td className="px-8 py-5">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    14
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                      <Icon name="person" className="text-on-primary-container" />
                    </div>
                    <div>
                      <div className="text-[16px] font-semibold leading-tight">You (Jane Doe)</div>
                      <div className="text-body-sm text-on-surface-variant">
                        Sustainability Officer
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[18px] font-semibold text-primary">4,210 pts</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-1 text-primary">
                    <Icon name="arrow_upward" className="text-lg" />
                    <span className="text-label-md">+24%</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-primary text-label-md hover:underline">View Stats</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-surface-variant/10 text-center">
          <button className="text-primary text-label-md flex items-center gap-2 mx-auto hover:gap-4 transition-all">
            Load More Entries <Icon name="expand_more" className="text-sm" />
          </button>
        </div>
      </section>
    </DashboardLayout>
  )
}

function LeaderRow({ rankClass, rank, icon, name, meta, points, trend, up }) {
  return (
    <tr className="hover:bg-surface-variant/10 transition-colors">
      <td className="px-8 py-5">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankClass}`}>
          {rank}
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
            <Icon name={icon} className="text-primary" />
          </div>
          <div>
            <div className="text-[16px] font-semibold leading-tight">{name}</div>
            <div className="text-body-sm text-on-surface-variant">{meta}</div>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 text-[18px] font-semibold text-primary">{points}</td>
      <td className="px-8 py-5">
        <div className={`flex items-center gap-1 ${up ? 'text-primary' : 'text-error'}`}>
          <Icon name={up ? 'arrow_upward' : 'arrow_downward'} className="text-lg" />
          <span className="text-label-md">{trend}</span>
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <button className="text-primary text-label-md hover:underline">View Team</button>
      </td>
    </tr>
  )
}
