import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'

const ORGS = [
  {
    icon: 'apartment',
    iconClass: 'bg-tertiary-container/20 text-tertiary',
    name: 'EcoSphere North America',
    users: '42 active',
    role: 'Regional Admin',
    perm: 'Read/Write',
    status: 'Active',
  },
  {
    icon: 'factory',
    iconClass: 'bg-primary/10 text-primary',
    name: 'EcoSphere Europe Hub',
    users: '118 active',
    role: 'Global Viewer',
    perm: 'Read Only',
    status: 'Active',
  },
  {
    icon: 'inventory',
    iconClass: 'bg-tertiary-fixed/20 text-tertiary',
    name: 'Supply Chain Beta Org',
    users: '5 active',
    role: 'Standard User',
    perm: 'Restricted',
    status: 'Pending',
  },
]

const ESG_CONFIG = [
  {
    id: 'autoEmission',
    title: 'Enable auto emission calculation',
    desc: 'System automatically derives CO2e from raw utility data using EPA standards.',
    default: true,
  },
  {
    id: 'requireReviewer',
    title: 'Require reviewer for all ESG entries',
    desc: 'Mandate a secondary approval workflow for every data point submitted.',
    default: false,
  },
  {
    id: 'anonymize',
    title: 'Historical Data Anonymization',
    desc: 'Automatically anonymize PII in social impact reports older than 2 years.',
    default: true,
  },
]

const NOTIFICATIONS = [
  {
    id: 'complianceAlerts',
    title: 'Email alerts for compliance issues',
    desc: 'Notify stakeholders immediately if emission thresholds are breached.',
    default: true,
  },
  {
    id: 'weeklySummary',
    title: 'Weekly Executive Summary',
    desc: 'Generate and send a PDF digest of all KPIs every Monday at 8:00 AM.',
    default: true,
  },
  {
    id: 'smsMfa',
    title: 'SMS Verification for Admin Access',
    desc: 'Require mobile MFA for all users with "Super Admin" privileges.',
    default: false,
  },
]

const DEFAULT_STATE = Object.fromEntries(
  [...ESG_CONFIG, ...NOTIFICATIONS].map((t) => [t.id, t.default])
)

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-10 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-outline-variant'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function ToggleRow({ item, checked, onChange }) {
  return (
    <div className="flex items-start justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-primary/30 transition-colors">
      <div className="pr-8">
        <p className="text-body-md font-semibold text-on-surface">{item.title}</p>
        <p className="text-body-sm text-outline">{item.desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export default function Settings() {
  const [toggles, setToggles] = useState(DEFAULT_STATE)
  const [dirty, setDirty] = useState(false)

  const setToggle = (id, value) => {
    setToggles((t) => ({ ...t, [id]: value }))
    setDirty(true)
  }

  const handleSave = () => setDirty(false)
  const handleDiscard = () => {
    setToggles(DEFAULT_STATE)
    setDirty(false)
  }

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-card-gap pb-24">
        {/* Organization Settings */}
        <section className="bg-white rounded-xl border border-outline-variant overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-headline-sm text-on-surface">Organization Settings</h3>
              <p className="text-body-sm text-on-surface-variant">
                Manage subsidiary entities and user access levels across the globe.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm"
                />
                <input
                  className="pl-8 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary outline-none w-full md:w-auto"
                  placeholder="Filter organizations..."
                  type="text"
                />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                <Icon name="add" className="text-sm" /> Add Organization
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-on-surface/5">
                <tr>
                  {['Name', 'Users', 'Role', 'Permissions', 'Status', ''].map((h, i) => (
                    <th key={i} className="px-6 py-4 text-label-md text-on-surface-variant">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {ORGS.map((org) => (
                  <tr key={org.name} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${org.iconClass}`}>
                          <Icon name={org.icon} />
                        </div>
                        <span className="text-body-md font-semibold">{org.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-body-sm">{org.users}</td>
                    <td className="px-6 py-4 text-body-sm">{org.role}</td>
                    <td className="px-6 py-4">
                      <span className="text-label-sm px-2 py-1 bg-outline-variant/30 rounded">
                        {org.perm}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {org.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-outline hover:text-primary transition-colors">
                        <Icon name="more_vert" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant text-body-sm text-on-surface-variant flex justify-between items-center">
            <span>Showing 3 of 12 organizations</span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-outline-variant rounded bg-white opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 border border-outline-variant rounded bg-white hover:bg-surface-container-low transition-colors">
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Config grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-card-gap">
          <section className="bg-white rounded-xl border border-outline-variant p-6 space-y-6">
            <div>
              <h3 className="text-headline-sm text-on-surface">ESG Configuration</h3>
              <p className="text-body-sm text-on-surface-variant">
                Define the logic for data processing and validation protocols.
              </p>
            </div>
            <div className="space-y-4">
              {ESG_CONFIG.map((item) => (
                <ToggleRow
                  key={item.id}
                  item={item}
                  checked={toggles[item.id]}
                  onChange={(v) => setToggle(item.id, v)}
                />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-outline-variant p-6 space-y-6">
            <div>
              <h3 className="text-headline-sm text-on-surface">Notification Protocols</h3>
              <p className="text-body-sm text-on-surface-variant">
                Configure how the system communicates critical events and reports.
              </p>
            </div>
            <div className="space-y-4">
              {NOTIFICATIONS.map((item) => (
                <ToggleRow
                  key={item.id}
                  item={item}
                  checked={toggles[item.id]}
                  onChange={(v) => setToggle(item.id, v)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Atmosphere card */}
        <section className="relative h-48 rounded-xl overflow-hidden border border-outline-variant">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent flex items-center px-8 md:px-12">
            <div className="max-w-md">
              <h4 className="text-headline-sm text-primary mb-2">Sustainable Infrastructure</h4>
              <p className="text-body-md text-on-surface-variant">
                All configuration changes are logged and timestamped for audit transparency,
                ensuring your path to Net Zero is traceable and secure.
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
            <span className="text-body-md text-on-surface-variant italic">
              Unsaved changes detected in your configuration...
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDiscard}
              className="px-6 py-2 rounded-lg text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="bg-primary text-white px-8 py-2 rounded-lg text-label-md shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
