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

const SCOPE_STYLES = {
  1: 'bg-emerald-100 text-emerald-700',
  2: 'bg-blue-100 text-blue-700',
  3: 'bg-amber-100 text-amber-700',
}

const SCOPE_ICON = { 1: 'oven_gen', 2: 'bolt', 3: 'local_shipping' }

const SEED = [
  { id: 1, source: 'HVAC Natural Gas', ref: 'Utility Meter #482', department: 'Facilities', scope: 1, target: 1200, current: 1080 },
  { id: 2, source: 'Grid Electricity', ref: 'Regional Sub-station', department: 'Operations', scope: 2, target: 4500, current: 4120 },
  { id: 3, source: 'Business Travel', ref: 'Internal CRM Logs', department: 'Sales & Marketing', scope: 3, target: 800, current: 940 },
  { id: 4, source: 'Downstream Logistics', ref: 'FedEx/UPS API Data', department: 'Logistics', scope: 3, target: 2200, current: 1850 },
]

const EMPTY_FORM = { source: '', ref: '', department: '', scope: 1, target: '', current: '' }
const PAGE_SIZE = 8

function statusOf(entry) {
  return entry.current > entry.target ? 'At Risk' : 'On Track'
}
function progressOf(entry) {
  if (!entry.target) return 0
  return Math.round((entry.current / entry.target) * 100)
}

export default function Environmental() {
  const toast = useToast()
  const loading = useSimulatedLoading()
  const [entries, setEntries] = useLocalStorageState('ecosphere.environmental', SEED)

  const [search, setSearch] = useState('')
  const [scopeFilter, setScopeFilter] = useState('all')
  const [sort, setSort] = useState({ key: 'source', dir: 'asc' })
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const summary = useMemo(() => {
    const total = entries.reduce((s, e) => s + Number(e.current || 0), 0)
    const scope2 = entries.filter((e) => e.scope === 2).reduce((s, e) => s + Number(e.current || 0), 0)
    const scope3 = entries.filter((e) => e.scope === 3).reduce((s, e) => s + Number(e.current || 0), 0)
    return { total, scope2, scope3 }
  }, [entries])

  const filtered = useMemo(() => {
    let list = [...entries]
    if (scopeFilter !== 'all') list = list.filter((e) => e.scope === Number(scopeFilter))
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (e) =>
          e.source.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          (e.ref || '').toLowerCase().includes(q)
      )
    }
    list.sort((a, b) => {
      const { key, dir } = sort
      let av = a[key]
      let bv = b[key]
      if (key === 'progress') {
        av = progressOf(a)
        bv = progressOf(b)
      }
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av < bv) return dir === 'asc' ? -1 : 1
      if (av > bv) return dir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [entries, scopeFilter, search, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setModalOpen(true)
  }
  const openEdit = (entry) => {
    setEditing(entry)
    setForm({ ...entry })
    setFormError('')
    setModalOpen(true)
  }

  const saveEntry = (e) => {
    e.preventDefault()
    if (!form.source.trim() || !form.department.trim()) {
      setFormError('Source and department are required.')
      return
    }
    if (form.target === '' || form.current === '' || Number(form.target) < 0 || Number(form.current) < 0) {
      setFormError('Target and current values must be valid non-negative numbers.')
      return
    }
    const payload = {
      ...form,
      scope: Number(form.scope),
      target: Number(form.target),
      current: Number(form.current),
    }
    if (editing) {
      setEntries((list) => list.map((it) => (it.id === editing.id ? { ...it, ...payload } : it)))
      toast('Emission entry updated.', 'success')
    } else {
      setEntries((list) => [{ ...payload, id: Date.now() }, ...list])
      toast('Emission entry added.', 'success')
    }
    setModalOpen(false)
  }

  const confirmDelete = () => {
    setEntries((list) => list.filter((it) => it.id !== deleteTarget.id))
    toast('Emission entry deleted.', 'success')
  }

  const handleExport = () => {
    exportToCsv(
      'environmental-emissions',
      filtered.map((e) => ({
        source: e.source,
        department: e.department,
        scope: `Scope ${e.scope}`,
        target: e.target,
        current: e.current,
        progress: `${progressOf(e)}%`,
        status: statusOf(e),
      })),
      [
        { key: 'source', label: 'Emission Source' },
        { key: 'department', label: 'Department' },
        { key: 'scope', label: 'Scope' },
        { key: 'target', label: 'Target (MT)' },
        { key: 'current', label: 'Current (MT)' },
        { key: 'progress', label: 'Progress' },
        { key: 'status', label: 'Status' },
      ]
    )
    toast('Exported to CSV.', 'info')
  }

  const SortHead = ({ label, sortKey }) => (
    <th
      className="px-4 sm:px-5 py-3 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider cursor-pointer select-none"
      onClick={() => toggleSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sort.key === sortKey && (
          <Icon name={sort.dir === 'asc' ? 'arrow_upward' : 'arrow_downward'} className="text-[12px]" />
        )}
      </span>
    </th>
  )

  return (
    <DashboardLayout title="Environmental">
      <div className="space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div>
            <nav className="flex items-center gap-1.5 text-[11px] text-on-surface-variant mb-1.5">
              <span>Environmental</span>
              <Icon name="chevron_right" className="text-[12px]" />
              <span className="text-primary font-semibold">Emission Tracking &amp; Goals</span>
            </nav>
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Decarbonization Roadmap</h1>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Real-time monitoring of corporate carbon footprint and progress towards Net Zero.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleExport}
              className="flex-1 sm:flex-none px-3 py-2 bg-white border border-black/[0.06] text-on-surface-variant text-xs font-medium rounded-lg hover:border-primary/30 hover:shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Icon name="file_download" className="text-[16px]" /> Export CSV
            </button>
            <button
              onClick={openAdd}
              className="flex-1 sm:flex-none px-3 py-2 bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white text-xs font-semibold rounded-lg hover:shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Icon name="add" className="text-[16px]" /> Add Entry
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <SummaryCard
            icon="factory"
            gradient="from-[#1b5e3b] to-[#2e7d52]"
            label="Total CO2e Emissions"
            value={summary.total.toLocaleString()}
            unit="MT"
            pct={75}
          />
          <SummaryCard
            icon="bolt"
            gradient="from-[#14532d] to-[#166534]"
            label="Scope 2 (Indirect)"
            value={summary.scope2.toLocaleString()}
            unit="MT"
            pct={33}
          />
          <SummaryCard
            icon="local_shipping"
            gradient="from-[#1e3a5f] to-[#2563eb]"
            label="Scope 3 (Chain)"
            value={summary.scope3.toLocaleString()}
            unit="MT"
            pct={60}
          />
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#334155] flex flex-col justify-between shadow-md">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            <div className="relative z-10">
              <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Sustainability Index</p>
              <h4 className="text-3xl font-extrabold text-white mt-1">84/100</h4>
            </div>
            <span className="relative z-10 inline-block px-2 py-1 bg-white/15 text-white rounded text-[11px] font-bold w-fit mt-3">
              TOP 5% IN SECTOR
            </span>
          </div>
        </div>

        {/* Data table */}
        <div className="bg-white border border-black/[0.04] rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 sm:px-5 py-3.5 border-b border-black/[0.04] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                <Icon name="filter_alt" className="text-[14px] text-emerald-600" />
              </div>
              <select
                value={scopeFilter}
                onChange={(e) => {
                  setScopeFilter(e.target.value)
                  setPage(1)
                }}
                className="bg-white border border-black/[0.06] text-sm rounded-lg py-1.5 px-3 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Scopes</option>
                <option value="1">Scope 1</option>
                <option value="2">Scope 2</option>
                <option value="3">Scope 3</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-[#F4F7F5] border border-black/[0.04] rounded-lg px-3 py-1.5 w-full sm:w-auto">
              <Icon name="search" className="text-on-surface-variant/50 text-[18px]" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-on-surface-variant/40 w-full sm:w-48 outline-none"
                placeholder="Filter sources..."
                type="text"
              />
            </div>
          </div>

          {loading ? (
            <SkeletonTable rows={6} cols={7} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="eco"
              title="No emission entries found"
              message={search || scopeFilter !== 'all' ? 'Try adjusting your filters or search.' : 'Add your first emission source to start tracking.'}
              action={
                <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <Icon name="add" className="text-[16px]" /> Add Entry
                </button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-black/[0.04]">
                    <SortHead label="Emission Source" sortKey="source" />
                    <SortHead label="Department" sortKey="department" />
                    <SortHead label="Scope" sortKey="scope" />
                    <SortHead label="Target (MT)" sortKey="target" />
                    <SortHead label="Current (MT)" sortKey="current" />
                    <SortHead label="Progress" sortKey="progress" />
                    <th className="px-4 sm:px-5 py-3 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.03]">
                  {paged.map((row) => {
                    const status = statusOf(row)
                    const progress = progressOf(row)
                    return (
                      <tr key={row.id} className="hover:bg-black/[0.015] transition-colors">
                        <td className="px-4 sm:px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                              <Icon name={SCOPE_ICON[row.scope]} className="text-emerald-600 text-[16px]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-on-surface">{row.source}</p>
                              <p className="text-[11px] text-on-surface-variant/60">{row.ref}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 text-sm text-on-surface-variant">{row.department}</td>
                        <td className="px-4 sm:px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${SCOPE_STYLES[row.scope]}`}>
                            SCOPE {row.scope}
                          </span>
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 text-sm font-medium">{row.target.toLocaleString()}</td>
                        <td className={`px-4 sm:px-5 py-3.5 text-sm font-bold ${status === 'At Risk' ? 'text-red-600' : ''}`}>
                          {row.current.toLocaleString()}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 h-1.5 bg-black/[0.04] rounded-full overflow-hidden min-w-[70px]">
                              <div
                                className={`h-full rounded-full ${status === 'At Risk' ? 'bg-red-500' : 'bg-emerald-500'}`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              />
                            </div>
                            <span className={`text-[11px] font-bold ${status === 'At Risk' ? 'text-red-600' : 'text-on-surface'}`}>
                              {progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-5 py-3.5">
                          <Badge tone={status === 'At Risk' ? 'atRisk' : 'onTrack'} dot>
                            {status}
                          </Badge>
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => openEdit(row)}
                            className="p-1.5 hover:bg-black/[0.04] rounded-lg text-on-surface-variant/50 hover:text-primary transition-colors"
                            aria-label={`Edit ${row.source}`}
                          >
                            <Icon name="edit" className="text-[16px]" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(row)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-on-surface-variant/50 hover:text-red-600 transition-colors"
                            aria-label={`Delete ${row.source}`}
                          >
                            <Icon name="delete" className="text-[16px]" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="px-4 sm:px-5 py-3 border-t border-black/[0.04] flex items-center justify-between">
              <p className="text-[11px] text-on-surface-variant/60">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-1.5 items-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 border border-black/[0.06] rounded-lg text-on-surface-variant hover:bg-black/[0.02] transition-colors disabled:opacity-30"
                >
                  <Icon name="chevron_left" className="text-[16px]" />
                </button>
                <span className="text-xs text-on-surface-variant px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 border border-black/[0.06] rounded-lg text-on-surface-variant hover:bg-black/[0.02] transition-colors disabled:opacity-30"
                >
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Emission Entry' : 'Add Emission Entry'}
        subtitle="Track a carbon emission source against its reduction target."
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-black/[0.03] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="entry-form"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white hover:shadow-md transition-all"
            >
              {editing ? 'Save Changes' : 'Add Entry'}
            </button>
          </>
        }
      >
        <form id="entry-form" onSubmit={saveEntry} className="space-y-4">
          {formError && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
          )}
          <Field label="Emission Source">
            <input
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="input"
              placeholder="e.g. Grid Electricity"
            />
          </Field>
          <Field label="Reference / Meter">
            <input
              value={form.ref}
              onChange={(e) => setForm({ ...form, ref: e.target.value })}
              className="input"
              placeholder="e.g. Utility Meter #482"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Department">
              <input
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="input"
                placeholder="e.g. Facilities"
              />
            </Field>
            <Field label="Scope">
              <select
                value={form.scope}
                onChange={(e) => setForm({ ...form, scope: e.target.value })}
                className="input"
              >
                <option value={1}>Scope 1</option>
                <option value={2}>Scope 2</option>
                <option value={3}>Scope 3</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Target (MT)">
              <input
                type="number"
                min="0"
                value={form.target}
                onChange={(e) => setForm({ ...form, target: e.target.value })}
                className="input"
                placeholder="1200"
              />
            </Field>
            <Field label="Current (MT)">
              <input
                type="number"
                min="0"
                value={form.current}
                onChange={(e) => setForm({ ...form, current: e.target.value })}
                className="input"
                placeholder="1080"
              />
            </Field>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete emission entry?"
        message={`This will permanently remove "${deleteTarget?.source}". This action cannot be undone.`}
        confirmLabel="Delete"
      />
    </DashboardLayout>
  )
}

function SummaryCard({ icon, gradient, label, value, unit, pct }) {
  return (
    <div className={`relative overflow-hidden p-4 sm:p-5 rounded-xl bg-gradient-to-br ${gradient} shadow-md`}>
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
            <Icon name={icon} className="text-[16px] text-white" />
          </div>
          <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">{label}</p>
        </div>
        <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
          {value} <span className="text-sm font-medium text-white/50">{unit}</span>
        </h4>
        <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-on-surface">{label}</span>
      {children}
    </label>
  )
}
