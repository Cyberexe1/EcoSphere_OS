import { useMemo, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/ui/Modal.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useToast } from '../components/ui/Toast.jsx'
import { useLocalStorageState } from '../hooks/useLocalStorageState.js'

const CATEGORIES = ['All Challenges', 'Energy', 'Waste', 'Water', 'Transport', 'Community']
const CAT_ICON = { Energy: 'bolt', Waste: 'delete_outline', Water: 'water_drop', Transport: 'commute', Community: 'diversity_3' }

const SEED_CHALLENGES = [
  { id: 1, category: 'Transport', accent: 'bg-accent-orange', title: 'Sustainability Sprint', desc: 'A company-wide race to reduce individual carbon footprints by 15% through smart commuting and energy habits.', goal: 'Goal: 5,000kg CO2', percent: 68, joined: false },
  { id: 2, category: 'Waste', accent: 'bg-primary', title: 'Zero-Waste Quarter', desc: 'Transform office operations to achieve 90% waste diversion. Earn the Circular Master badge upon completion.', goal: 'Goal: 90% Diversion', percent: 0, joined: false },
  { id: 3, category: 'Water', accent: 'bg-tertiary', title: 'Aqua Conservation', desc: 'Departmental competition to reduce water usage in facilities by optimizing cooling and irrigation systems.', goal: 'Goal: 200k Liters', percent: 42, joined: false },
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

const EMPTY_CHALLENGE = { title: '', desc: '', category: 'Energy', goal: '' }

export default function Gamification() {
  const toast = useToast()
  const [challenges, setChallenges] = useLocalStorageState('ecosphere.gamification', SEED_CHALLENGES)
  const [activeCat, setActiveCat] = useState('All Challenges')
  const [detail, setDetail] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const [form, setForm] = useState(EMPTY_CHALLENGE)
  const [formError, setFormError] = useState('')

  const filtered = useMemo(
    () => (activeCat === 'All Challenges' ? challenges : challenges.filter((c) => c.category === activeCat)),
    [challenges, activeCat]
  )

  const toggleJoin = (id) => {
    let joinedNow = false
    setChallenges((list) =>
      list.map((c) => {
        if (c.id !== id) return c
        joinedNow = !c.joined
        return { ...c, joined: joinedNow }
      })
    )
    toast(joinedNow ? 'Joined challenge — good luck!' : 'Left challenge.', joinedNow ? 'success' : 'info')
  }

  const createChallenge = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.goal.trim()) {
      setFormError('Title and goal are required.')
      return
    }
    setChallenges((list) => [
      { id: Date.now(), category: form.category, accent: 'bg-accent-orange', title: form.title, desc: form.desc, goal: form.goal, percent: 0, joined: false },
      ...list,
    ])
    toast('Challenge created.', 'success')
    setCreateModal(false)
    setForm(EMPTY_CHALLENGE)
  }

  return (
    <DashboardLayout title="Gamification">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-5 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Impact Challenges</h1>
          <p className="text-sm text-on-surface-variant mt-0.5 max-w-xl">
            Drive sustainability through healthy competition. Engage your teams in meaningful environmental action.
          </p>
        </div>
        <button
          onClick={() => {
            setForm(EMPTY_CHALLENGE)
            setFormError('')
            setCreateModal(true)
          }}
          className="px-3 py-2 bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white text-xs font-semibold rounded-lg hover:shadow-md hover:shadow-primary/20 transition-all flex items-center gap-1.5"
        >
          <Icon name="add" className="text-[16px]" />
          Create Challenge
        </button>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCat === cat ? 'bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white shadow-sm' : 'bg-white border border-black/[0.06] text-on-surface-variant hover:border-primary/30'
            }`}
          >
            {CAT_ICON[cat] && <Icon name={CAT_ICON[cat]} className="text-[14px]" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Challenge cards */}
      {filtered.length === 0 ? (
        <div className="mb-8 bg-white border border-black/[0.04] rounded-xl">
          <EmptyState icon="emoji_events" title="No challenges in this category" message="Try another category or create a new challenge." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white border border-black/[0.04] rounded-xl p-5 flex flex-col hover:shadow-md transition-all duration-300 group relative overflow-hidden shadow-sm">
              <div className={`absolute top-0 left-0 w-1 h-full ${c.accent} opacity-80`} />
              <div className="flex justify-between items-start mb-3">
                <div className="bg-[#F4F7F5] text-on-surface-variant px-2.5 py-0.5 rounded-lg text-[11px] font-semibold">{c.category}</div>
                <button onClick={() => setDetail(c)} className="text-on-surface-variant/40 hover:text-primary transition-colors" aria-label="View details">
                  <Icon name="open_in_full" className="text-[16px]" />
                </button>
              </div>
              <h3 className="text-headline-sm mb-2">{c.title}</h3>
              <p className="text-body-md text-on-surface-variant mb-6 flex-1 line-clamp-3">{c.desc}</p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-label-md">
                  <span>{c.goal}</span>
                  <span className="text-accent-orange">{c.percent}%</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-2">
                  <div className="bg-accent-orange h-2 rounded-full" style={{ width: `${c.percent}%` }} />
                </div>
              </div>
              <button
                onClick={() => toggleJoin(c.id)}
                className={`w-full text-label-md py-3 rounded-lg transition-all active:scale-[0.98] ${
                  c.joined ? 'border border-accent-orange text-accent-orange hover:bg-accent-orange/5' : 'bg-accent-orange text-on-accent-orange hover:shadow-lg'
                }`}
              >
                {c.joined ? 'Joined ✓ — Leave' : 'Join Challenge'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Badges */}
      <div className="mb-12 bg-white border border-outline-variant rounded-xl p-8 eco-shadow">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <h3 className="text-headline-md flex items-center gap-3">
            <Icon name="workspace_premium" className="text-accent-orange" style={{ fontVariationSettings: "'FILL' 1" }} />
            Badges Earned
          </h3>
          <a href="#" className="text-primary text-label-md hover:underline">View All Achievement Hall</a>
        </div>
        <div className="flex items-center gap-10 overflow-x-auto pb-4">
          {BADGES.map((b) => (
            <div key={b.label} className={`flex flex-col items-center gap-3 group shrink-0 ${b.locked ? 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center p-1 transition-transform group-hover:scale-110 ${b.locked ? 'bg-surface-variant' : `${b.bg} border-2 border-dashed ${b.ring}`}`}>
                <div className={`w-full h-full rounded-full flex items-center justify-center text-white shadow-lg ${b.locked ? 'bg-outline-variant text-on-surface-variant' : b.fill}`}>
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
            <p className="text-body-md text-on-surface-variant">Top performing departments and teams this quarter.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-variant/20">
              <tr className="text-on-surface-variant text-label-md border-b border-outline-variant">
                {['Rank', 'User / Team', 'Impact Points', 'Trend', 'Action'].map((h, i) => (
                  <th key={h} className={`px-8 py-4 font-semibold uppercase tracking-wider ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {LEADERBOARD.map((r) => (
                <tr key={r.rank} className="hover:bg-surface-variant/10 transition-colors">
                  <td className="px-8 py-5"><div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${r.rankClass}`}>{r.rank}</div></td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center"><Icon name={r.icon} className="text-primary" /></div>
                      <div>
                        <div className="text-[16px] font-semibold leading-tight">{r.name}</div>
                        <div className="text-body-sm text-on-surface-variant">{r.meta}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[18px] font-semibold text-primary">{r.points}</td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-1 ${r.up ? 'text-primary' : 'text-error'}`}>
                      <Icon name={r.up ? 'arrow_upward' : 'arrow_downward'} className="text-lg" />
                      <span className="text-label-md">{r.trend}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right"><button className="text-primary text-label-md hover:underline">View Team</button></td>
                </tr>
              ))}
              <tr className="bg-primary/5 border-l-4 border-primary">
                <td className="px-8 py-5"><div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">14</div></td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center"><Icon name="person" className="text-on-primary-container" /></div>
                    <div>
                      <div className="text-[16px] font-semibold leading-tight">You (Jane Doe)</div>
                      <div className="text-body-sm text-on-surface-variant">Sustainability Officer</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-[18px] font-semibold text-primary">4,210 pts</td>
                <td className="px-8 py-5"><div className="flex items-center gap-1 text-primary"><Icon name="arrow_upward" className="text-lg" /><span className="text-label-md">+24%</span></div></td>
                <td className="px-8 py-5 text-right"><button className="text-primary text-label-md hover:underline">View Stats</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Detail modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.title} subtitle={detail?.category}>
        {detail && (
          <div className="space-y-4">
            <p className="text-body-md text-on-surface-variant">{detail.desc}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-label-md">
                <span>{detail.goal}</span>
                <span className="text-accent-orange">{detail.percent}%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-accent-orange h-2 rounded-full" style={{ width: `${detail.percent}%` }} />
              </div>
            </div>
            <button
              onClick={() => {
                toggleJoin(detail.id)
                setDetail(null)
              }}
              className={`w-full text-label-md py-3 rounded-lg transition-all ${detail.joined ? 'border border-accent-orange text-accent-orange' : 'bg-accent-orange text-on-accent-orange'}`}
            >
              {detail.joined ? 'Leave Challenge' : 'Join Challenge'}
            </button>
          </div>
        )}
      </Modal>

      {/* Create modal */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Create Challenge"
        subtitle="Launch a new sustainability challenge for your teams."
        footer={
          <>
            <button onClick={() => setCreateModal(false)} className="px-5 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
            <button type="submit" form="challenge-form" className="px-5 py-2 rounded-lg text-label-md bg-accent-orange text-on-accent-orange hover:brightness-110 transition-all">Create</button>
          </>
        }
      >
        <form id="challenge-form" onSubmit={createChallenge} className="space-y-4">
          {formError && <p className="text-body-sm text-error bg-error/10 rounded-lg px-3 py-2">{formError}</p>}
          <label className="block space-y-1.5">
            <span className="text-label-md text-on-surface">Title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="e.g. Cycle to Work Week" />
          </label>
          <label className="block space-y-1.5">
            <span className="text-label-md text-on-surface">Description</span>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="input h-auto py-2" rows={3} placeholder="What is this challenge about?" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface">Category</span>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                {CATEGORIES.filter((c) => c !== 'All Challenges').map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface">Goal</span>
              <input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} className="input" placeholder="e.g. 1,000 km cycled" />
            </label>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}
