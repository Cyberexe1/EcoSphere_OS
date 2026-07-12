import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'

const SUMMARY_CARDS = [
  {
    icon: 'factory',
    iconClass: 'bg-primary-container/20 text-primary',
    trend: '+4.2% YoY',
    trendClass: 'text-primary',
    label: 'Total CO2e Emissions',
    value: '12,482.5',
    unit: 'MT',
    bar: 'bg-primary',
    barWidth: 'w-3/4',
  },
  {
    icon: 'bolt',
    iconClass: 'bg-secondary-container/20 text-secondary',
    trend: '-12% Goal',
    trendClass: 'text-secondary',
    label: 'Scope 2 (Indirect)',
    value: '3,120.2',
    unit: 'MT',
    bar: 'bg-secondary',
    barWidth: 'w-1/3',
  },
  {
    icon: 'local_shipping',
    iconClass: 'bg-tertiary-container/20 text-tertiary',
    trend: 'Stable',
    trendClass: 'text-tertiary',
    label: 'Scope 3 (Chain)',
    value: '8,450.8',
    unit: 'MT',
    bar: 'bg-tertiary',
    barWidth: 'w-[60%]',
  },
]

const SCOPE_STYLES = {
  'SCOPE 1': 'bg-primary/10 text-primary',
  'SCOPE 2': 'bg-secondary/10 text-secondary',
  'SCOPE 3': 'bg-tertiary/10 text-tertiary',
}

const ROWS = [
  {
    icon: 'oven_gen',
    iconColor: 'text-primary',
    source: 'HVAC Natural Gas',
    ref: 'Utility Meter #482',
    dept: 'Facilities',
    scope: 'SCOPE 1',
    target: '1,200',
    current: '1,080',
    progress: 90,
    bar: 'bg-primary',
    status: 'On Track',
  },
  {
    icon: 'bolt',
    iconColor: 'text-secondary',
    source: 'Grid Electricity',
    ref: 'Regional Sub-station',
    dept: 'Operations',
    scope: 'SCOPE 2',
    target: '4,500',
    current: '4,120',
    progress: 91,
    bar: 'bg-secondary',
    status: 'On Track',
  },
  {
    icon: 'flight',
    iconColor: 'text-tertiary',
    source: 'Business Travel',
    ref: 'Internal CRM Logs',
    dept: 'Sales & Marketing',
    scope: 'SCOPE 3',
    target: '800',
    current: '940',
    currentClass: 'text-error',
    progress: 117,
    bar: 'bg-error',
    progressClass: 'text-error',
    status: 'At Risk',
  },
  {
    icon: 'local_shipping',
    iconColor: 'text-primary',
    source: 'Downstream Logistics',
    ref: 'FedEx/UPS API Data',
    dept: 'Logistics',
    scope: 'SCOPE 3',
    target: '2,200',
    current: '1,850',
    progress: 84,
    bar: 'bg-primary',
    status: 'On Track',
  },
]

const SITE_HEALTH = [
  { name: 'New York HQ', ok: true },
  { name: 'Berlin Plant', ok: true },
  { name: 'Sydney Office', ok: false },
]

export default function Environmental() {
  return (
    <DashboardLayout title="EcoSphere: ESG Management Platform">
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-wrap gap-4 justify-between items-end">
          <div>
            <nav className="flex items-center gap-2 text-label-sm text-outline mb-2">
              <span>Environmental</span>
              <Icon name="chevron_right" className="text-[14px]" />
              <span className="text-primary font-semibold">Emission Tracking &amp; Goals</span>
            </nav>
            <h1 className="text-display-lg text-on-surface">Decarbonization Roadmap</h1>
            <p className="text-body-md text-on-surface-variant mt-1">
              Real-time monitoring of corporate carbon footprint and progress towards Net Zero.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#E5EAE8] bg-white text-primary text-label-md rounded-lg hover:bg-surface transition-colors flex items-center gap-2">
              <Icon name="file_download" className="text-[18px]" /> Export PDF
            </button>
            <button className="px-5 py-2 bg-primary text-white text-label-md rounded-lg hover:brightness-110 shadow-sm transition-all flex items-center gap-2">
              <Icon name="add" className="text-[18px]" /> Add Entry
            </button>
          </div>
        </div>

        {/* Goal summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-card-gap">
          {SUMMARY_CARDS.map((c) => (
            <div
              key={c.label}
              className="bg-white border border-[#E5EAE8] p-6 rounded-xl relative overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.iconClass}`}>
                  <Icon name={c.icon} />
                </div>
                <span className={`text-label-md ${c.trendClass}`}>{c.trend}</span>
              </div>
              <p className="text-label-md text-outline uppercase tracking-wider">{c.label}</p>
              <h4 className="text-[28px] font-bold text-on-surface mt-1">
                {c.value} <span className="text-label-md font-normal text-outline">{c.unit}</span>
              </h4>
              <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} ${c.barWidth} rounded-full`} />
              </div>
            </div>
          ))}

          {/* Sustainability index card */}
          <div className="bg-inverse-surface p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
            <div className="z-10">
              <p className="text-label-md text-primary-fixed uppercase tracking-wider">
                Sustainability Index
              </p>
              <h4 className="text-[28px] font-bold text-white mt-1">84/100</h4>
            </div>
            <div className="mt-2 z-10">
              <span className="inline-block px-2 py-1 bg-primary/20 text-primary-fixed rounded text-label-sm font-bold">
                TOP 5% IN SECTOR
              </span>
            </div>
          </div>
        </div>

        {/* Data table */}
        <div className="bg-white border border-[#E5EAE8] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-label-sm text-outline font-semibold">SITE:</label>
                <select className="bg-white border-outline-variant text-body-md rounded-lg py-1.5 px-3 focus:ring-primary focus:border-primary">
                  <option>All Global Sites</option>
                  <option>North America HQ</option>
                  <option>Berlin Logistics Hub</option>
                  <option>Tokyo Data Center</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-label-sm text-outline font-semibold">SCOPE:</label>
                <select className="bg-white border-outline-variant text-body-md rounded-lg py-1.5 px-3 focus:ring-primary focus:border-primary">
                  <option>Scope 1, 2, 3</option>
                  <option>Scope 1 Only</option>
                  <option>Scope 2 Only</option>
                  <option>Scope 3 Only</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-outline-variant rounded-lg px-3 py-1.5 w-full md:w-auto">
              <Icon name="search" className="text-outline text-[20px]" />
              <input
                className="border-none p-0 text-body-md focus:ring-0 placeholder-outline/50 w-full md:w-48 outline-none"
                placeholder="Filter sources..."
                type="text"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high border-b border-outline-variant">
                  {['Emission Source', 'Department', 'Scope', 'Target (MT)', 'Current (MT)', 'Progress', 'Status', ''].map(
                    (h, i) => (
                      <th
                        key={i}
                        className="px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {ROWS.map((row) => (
                  <tr key={row.source} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                          <Icon name={row.icon} className={`${row.iconColor} text-[20px]`} />
                        </div>
                        <div>
                          <p className="text-body-md font-bold text-on-surface">{row.source}</p>
                          <p className="text-label-sm text-outline">{row.ref}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{row.dept}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${SCOPE_STYLES[row.scope]}`}
                      >
                        {row.scope}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md font-medium">{row.target}</td>
                    <td className={`px-6 py-4 text-body-md font-bold ${row.currentClass ?? ''}`}>
                      {row.current}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden min-w-[80px]">
                          <div
                            className={`h-full ${row.bar}`}
                            style={{ width: `${Math.min(row.progress, 100)}%` }}
                          />
                        </div>
                        <span className={`text-label-sm font-bold ${row.progressClass ?? 'text-on-surface'}`}>
                          {row.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {row.status === 'At Risk' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error/10 text-error font-bold text-[11px] uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
                          At Risk
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          On Track
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-surface-variant rounded-full text-outline">
                        <Icon name="more_vert" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
            <p className="text-label-sm text-outline">Showing 1 to 4 of 124 entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-[#E5EAE8] rounded-lg text-outline hover:bg-surface transition-colors">
                <Icon name="chevron_left" className="text-[18px]" />
              </button>
              <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-label-md font-bold">1</button>
              <button className="px-3 py-1.5 border border-[#E5EAE8] rounded-lg text-outline hover:bg-surface transition-colors text-label-md">2</button>
              <button className="px-3 py-1.5 border border-[#E5EAE8] rounded-lg text-outline hover:bg-surface transition-colors text-label-md">3</button>
              <span className="px-2 py-1.5 text-outline">...</span>
              <button className="px-3 py-1.5 border border-[#E5EAE8] rounded-lg text-outline hover:bg-surface transition-colors">
                <Icon name="chevron_right" className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap">
          <div className="lg:col-span-2 bg-white border border-[#E5EAE8] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-headline-sm text-on-surface">Target Variance Projection</h5>
              <button className="text-primary text-label-md flex items-center gap-1">
                Full Analysis <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>
            <div className="h-64 bg-surface-container-lowest rounded-xl flex items-end justify-between p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-xl" />
              {[
                { h: 'h-[40%]', c: 'bg-primary/20' },
                { h: 'h-[55%]', c: 'bg-primary/20' },
                { h: 'h-[48%]', c: 'bg-primary/20' },
                { h: 'h-[80%]', c: 'bg-primary/60' },
                { h: 'h-[65%]', c: 'bg-primary/20' },
                { h: 'h-[72%]', c: 'bg-primary/20' },
                { h: 'h-[95%]', c: 'bg-error/40', peak: true },
                { h: 'h-[60%]', c: 'bg-primary/20' },
              ].map((bar, i) => (
                <div key={i} className={`relative w-12 ${bar.c} ${bar.h} rounded-t transition-all`}>
                  {bar.peak && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-error text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                      Current Peak
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h6 className="text-label-md text-primary uppercase tracking-widest mb-3">
                AI Recommendation
              </h6>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                "Switching Logistics Provider C to electric rail transport for the EMEA region could
                reduce Scope 3 emissions by <span className="text-primary font-bold">14%</span> by
                Q4."
              </p>
              <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-label-md hover:shadow-lg transition-all">
                Review Impact Report
              </button>
            </div>
            <div className="bg-white border border-[#E5EAE8] rounded-2xl p-6 shadow-sm">
              <h6 className="text-label-md text-outline uppercase tracking-widest mb-4">
                Site Health
              </h6>
              <div className="space-y-4">
                {SITE_HEALTH.map((site) => (
                  <div key={site.name} className="flex justify-between items-center">
                    <span className="text-body-md font-medium">{site.name}</span>
                    <Icon
                      name={site.ok ? 'check_circle' : 'warning'}
                      className={site.ok ? 'text-primary' : 'text-error'}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    />
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
