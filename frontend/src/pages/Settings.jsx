import { useMemo, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/ui/Modal.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useToast } from '../components/ui/Toast.jsx'
import { useLocalStorageState } from '../hooks/useLocalStorageState.js'

const SEED_ORGS = [
  { id: 1, name: 'EcoSphere North America', icon: 'apartment', iconClass: 'bg-tertiary-container/20 text-tertiary', users: 42, role: 'Regional Admin', perm: 'Read/Write', status: 'Active' },
  { id: 2, name: 'EcoSphere Europe Hub', icon: 'factory', iconClass: 'bg-primary/10 text-primary', users: 118, role: 'Global Viewer', perm: 'Read Only', status: 'Active' },
  { id: 3, name: 'Supply Chain Beta Org', icon: 'inventory', iconClass: 'bg-tertiary-fixed/20 text-tertiary', users: 5, role: 'Standard User', perm: 'Restricted', status: 'Pending' },
]

const ESG_CONFIG = [
  { id: 'autoEmission', title: 'Enable auto emission calculation', desc: 'System automatically derives CO2e from raw utility data using EPA standards.', default: true },
  { id: 'requireReviewer', title: 'Require reviewer for all ESG entries', desc: 'Mandate a secondary approval workflow for every data point submitted.', default: false },
  { id: 'anonymize', title: 'Historical Data Anonymization', desc: 'Automatically anonymize PII in social impact reports older than 2 years.', default: true },
]
const NOTIFICATIONS = [
  { id: 'complianceAlerts', title: 'Email alerts for compliance issues', desc: 'Notify stakeholders immediately if emission thresholds are breached.', default: true },
  { id: 'weeklySummary', title: 'Weekly Executive Summary', desc: 'Generate and send a PDF digest of all KPIs every Monday at 8:00 AM.', default: true },
  { id: 'smsMfa', title: 'SMS Verification for Admin Access', desc: 'Require mobile MFA for all users with "Super Admin" privileges.', default: false },
]
const DEFAULT_TOGGLES = Object.fromEntries([...ESG_CONFIG, ...NOTIFICATIONS].map((t) => [t.id, t.default]))
const EMPTY_ORG = { name: '', role: 'Standard User', perm: 'Read Only', status: 'Active', users: 0 }

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-10 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-outline-variant'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const toast = useToast()
  const [orgs, setOrgs] = useLocalStorageState('ecosphere.settings.orgs', SEED_ORGS)
  const [savedToggles, setSavedToggles] = useLocalStorageState('ecosphere.settings.toggles', DEFAULT_TOGGLES)
  const [toggles, setToggles] = useState(savedToggles)
  const [dirty, setDirty] = useState(false)

  const [search, setSearch] = useState('')
  const [orgModal, setOrgModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_ORG)
  const [formError, setFormError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return orgs
    const q = search.toLowerCase()
    return orgs.filter((o) => o.name.toLowerCase().includes(q) || o.role.toLowerCase().includes(q))
  }, [orgs, search])

  const setToggle = (id, value) => {
    setToggles((t) => ({ ...t, [id]: value }))
    setDirty(true)
  }
  const handleSave = () => {
    setSavedToggles(toggles)
    setDirty(false)
    toast('Settings saved.', 'success')
  }
  const handleDiscard = () => {
    setToggles(savedToggles)
    setDirty(false)
  }

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY_ORG)
    setFormError('')
    setOrgModal(true)
  }
  const openEdit = (org) => {
    setEditing(org)
    setForm({ ...org })
    setFormError('')
    setOrgModal(true)
  }
  const saveOrg = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setFormError('Organization name is required.')
      return
    }
    if (editing) {
      setOrgs((list) => list.map((o) => (o.id === editing.id ? { ...o, ...form, users: Number(form.users) } : o)))
      toast('Organization updated.', 'success')
    } else {
      setOrgs((list) => [
        { id: Date.now(), icon: 'apartment', iconClass: 'bg-primary/10 text-primary', ...form, users: Number(form.users) },
        ...list,
      ])
      toast('Organization added.', 'success')
    }
    setOrgModal(false)
  }
  const confirmDelete = () => {
    setOrgs((list) => list.filter((o) => o.id !== deleteTarget.id))
    toast('Organization removed.', 'success')
  }

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-card-gap pb-24">
        {/* Organization Settings */}
        <section className="bg-white rounded-xl border border-outline-variant overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-headline-sm text-on-surface">Organization Settings</h3>
              <p className="text-body-sm text-on-surface-variant">Manage subsidiary entities and user access levels across the globe.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary outline-none w-full md:w-auto"
                  placeholder="Filter organizations..."
                />
              </div>
              <button onClick={openAdd} className="bg-primary text-white px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                <Icon name="add" className="text-sm" /> Add Organization
              </button>
            </div>
          </div>
          {filteredOrgs.length === 0 ? (
            <EmptyState icon="apartment" title="No organizations found" message="No organizations match your search." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-on-surface/5">
                  <tr>
                    {['Name', 'Users', 'Role', 'Permissions', 'Status', ''].map((h, i) => (
                      <th key={i} className="px-6 py-4 text-label-md text-on-surface-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredOrgs.map((org) => (
                    <tr key={org.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded flex items-center justify-center ${org.iconClass}`}>
                            <Icon name={org.icon} />
                          </div>
                          <span className="text-body-md font-semibold">{org.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-body-sm">{org.users} active</td>
                      <td className="px-6 py-4 text-body-sm">{org.role}</td>
                      <td className="px-6 py-4">
                        <span className="text-label-sm px-2 py-1 bg-outline-variant/30 rounded">{org.perm}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge tone={org.status === 'Active' ? 'success' : 'pending'} dot>{org.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button onClick={() => openEdit(org)} className="p-1.5 text-outline hover:text-primary hover:bg-surface-variant rounded-full transition-colors" aria-label={`Edit ${org.name}`}>
                          <Icon name="edit" className="text-[18px]" />
                        </button>
                        <button onClick={() => setDeleteTarget(org)} className="p-1.5 text-outline hover:text-error hover:bg-error/10 rounded-full transition-colors" aria-label={`Delete ${org.name}`}>
                          <Icon name="delete" className="text-[18px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant text-body-sm text-on-surface-variant">
            Showing {filteredOrgs.length} of {orgs.length} organizations
          </div>
        </section>

        {/* Config grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-card-gap">
          <ToggleSection title="ESG Configuration" desc="Define the logic for data processing and validation protocols." items={ESG_CONFIG} toggles={toggles} setToggle={setToggle} Toggle={Toggle} />
          <ToggleSection title="Notification Protocols" desc="Configure how the system communicates critical events and reports." items={NOTIFICATIONS} toggles={toggles} setToggle={setToggle} Toggle={Toggle} />
        </div>

        <section className="relative h-48 rounded-xl overflow-hidden border border-outline-variant">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent flex items-center px-8 md:px-12">
            <div className="max-w-md">
              <h4 className="text-headline-sm text-primary mb-2">Sustainable Infrastructure</h4>
              <p className="text-body-md text-on-surface-variant">
                All configuration changes are logged and timestamped for audit transparency, ensuring your path to Net Zero is traceable and secure.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky save bar */}
      {dirty && (
        <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 z-40 bg-white border-t border-outline-variant py-4 px-container-padding flex flex-col sm:flex-row gap-3 items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-body-md text-on-surface-variant italic">Unsaved changes detected in your configuration...</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleDiscard} className="px-6 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors">
              Discard
            </button>
            <button onClick={handleSave} className="bg-primary text-white px-8 py-2 rounded-lg text-label-md shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Org modal */}
      <Modal
        open={orgModal}
        onClose={() => setOrgModal(false)}
        title={editing ? 'Edit Organization' : 'Add Organization'}
        subtitle="Configure a subsidiary entity and its access level."
        footer={
          <>
            <button onClick={() => setOrgModal(false)} className="px-5 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
            <button type="submit" form="org-form" className="px-5 py-2 rounded-lg text-label-md bg-primary text-white hover:brightness-110 transition-all">
              {editing ? 'Save Changes' : 'Add Organization'}
            </button>
          </>
        }
      >
        <form id="org-form" onSubmit={saveOrg} className="space-y-4">
          {formError && <p className="text-body-sm text-error bg-error/10 rounded-lg px-3 py-2">{formError}</p>}
          <label className="block space-y-1.5">
            <span className="text-label-md text-on-surface">Organization Name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="e.g. EcoSphere Asia Pacific" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface">Users</span>
              <input type="number" min="0" value={form.users} onChange={(e) => setForm({ ...form, users: e.target.value })} className="input" />
            </label>
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface">Status</span>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input">
                <option>Active</option>
                <option>Pending</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface">Role</span>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
                <option>Standard User</option>
                <option>Regional Admin</option>
                <option>Global Viewer</option>
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface">Permissions</span>
              <select value={form.perm} onChange={(e) => setForm({ ...form, perm: e.target.value })} className="input">
                <option>Read Only</option>
                <option>Read/Write</option>
                <option>Restricted</option>
              </select>
            </label>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Remove organization?"
        message={`This will remove "${deleteTarget?.name}" and revoke access for its ${deleteTarget?.users} users.`}
        confirmLabel="Remove"
      />
    </DashboardLayout>
  )
}

function ToggleSection({ title, desc, items, toggles, setToggle, Toggle }) {
  return (
    <section className="bg-white rounded-xl border border-outline-variant p-6 space-y-6">
      <div>
        <h3 className="text-headline-sm text-on-surface">{title}</h3>
        <p className="text-body-sm text-on-surface-variant">{desc}</p>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-primary/30 transition-colors">
            <div className="pr-8">
              <p className="text-body-md font-semibold text-on-surface">{item.title}</p>
              <p className="text-body-sm text-outline">{item.desc}</p>
            </div>
            <Toggle checked={toggles[item.id]} onChange={(v) => setToggle(item.id, v)} />
          </div>
        ))}
      </div>
    </section>
  )
}
