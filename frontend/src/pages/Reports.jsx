import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'

const REPORT_TYPES = [
  {
    icon: 'forest',
    title: 'Environmental',
    desc: 'Carbon footprint, energy efficiency metrics, and water usage analysis across all facilities.',
  },
  {
    icon: 'diversity_3',
    title: 'Social',
    desc: 'Workforce diversity, employee turnover, and community impact programs and engagement.',
  },
  {
    icon: 'account_balance',
    title: 'Governance',
    desc: 'Board structure, executive compensation, and compliance tracking with global regulations.',
  },
  {
    icon: 'analytics',
    title: 'ESG Summary',
    desc: 'A holistic overview combining all pillars into a single stakeholder-ready executive summary.',
  },
]

const EXPORTS = [
  { icon: 'picture_as_pdf', label: 'Export PDF' },
  { icon: 'table_chart', label: 'Excel' },
  { icon: 'csv', label: 'CSV' },
]

const METRICS = [
  { label: 'CO2e Emissions', checked: true },
  { label: 'Renewable Energy %', checked: false },
  { label: 'Water Recycled', checked: true },
  { label: 'Waste to Landfill', checked: false },
]

const GROUPINGS = [
  { label: 'By Month', active: true },
  { label: 'By Site', active: false },
  { label: 'By Pillar', active: false },
]

const BARS = [
  'h-[60%] bg-primary-container',
  'h-[40%] bg-primary',
  'h-[85%] bg-primary-container',
  'h-[55%] bg-primary',
  'h-[70%] bg-primary-container',
  'h-[95%] bg-primary',
  'h-[30%] bg-primary-container',
  'h-[50%] bg-primary',
]

const PREVIEW_ROWS = [
  { name: 'Oslo Central Hub', co2: '1,240.5', energy: '3,890', status: 'OPTIMIZED' },
  { name: 'Berlin Production Plant B', co2: '4,560.2', energy: '12,100', status: 'ATTENTION' },
  { name: 'Singapore Logistics Center', co2: '890.4', energy: '2,150', status: 'OPTIMIZED' },
]

export default function Reports() {
  return (
    <DashboardLayout title="EcoSphere: ESG Management Platform">
      {/* Page header */}
      <div className="flex flex-wrap gap-4 justify-between items-end mb-8">
        <div>
          <h1 className="text-display-lg text-on-surface">Reports &amp; Analytics</h1>
          <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Comprehensive insights for corporate sustainability reporting. Generate automated ESG
            disclosures or build custom analytical views.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-outline-variant shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary-container" />
          <span className="text-label-md text-on-surface-variant uppercase tracking-wider">
            Sync Status: Active
          </span>
        </div>
      </div>

      {/* Report type cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap mb-12">
        {REPORT_TYPES.map((r) => (
          <div
            key={r.title}
            className="bg-white border border-outline-variant p-6 rounded-xl hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Icon name={r.icon} className="text-[#14B8A6]" />
            </div>
            <h3 className="text-headline-sm mb-2 text-on-surface">{r.title}</h3>
            <p className="text-body-sm text-on-surface-variant mb-6 h-12 line-clamp-2">{r.desc}</p>
            <button className="w-full py-2 px-4 border border-primary text-primary text-label-md rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
              Generate <Icon name="auto_awesome" className="text-[16px]" />
            </button>
          </div>
        ))}
      </section>

      {/* Custom report builder */}
      <section className="bg-white border border-outline-variant rounded-2xl overflow-hidden">
        <div className="p-container-padding border-b border-outline-variant flex flex-wrap gap-4 justify-between items-center bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <Icon name="construction" className="text-primary" />
            <h2 className="text-headline-md">Custom Report Builder</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {EXPORTS.map((e) => (
              <button
                key={e.label}
                className="px-4 py-2 text-on-surface-variant text-label-md flex items-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors"
              >
                <Icon name={e.icon} className="text-[18px]" /> {e.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Form controls */}
          <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-outline-variant bg-surface-container-low/30 space-y-6">
            <div>
              <label className="block text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">
                Data Source
              </label>
              <select className="w-full rounded-xl border-outline-variant text-body-sm focus:ring-primary focus:border-primary">
                <option>Global Operations</option>
                <option>North American Division</option>
                <option>European Supply Chain</option>
                <option>Asia-Pacific Facilities</option>
              </select>
            </div>
            <div>
              <label className="block text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">
                Date Range
              </label>
              <select className="w-full rounded-xl border-outline-variant text-body-sm focus:ring-primary focus:border-primary">
                <option>Last 12 Months</option>
                <option>Year to Date (YTD)</option>
                <option>Previous Fiscal Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">
                Primary Metric
              </label>
              <div className="space-y-2 mt-3">
                {METRICS.map((m) => (
                  <label key={m.label} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={m.checked}
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="text-body-sm text-on-surface group-hover:text-primary transition-colors">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-label-md text-on-surface-variant mb-2 uppercase tracking-wide">
                Grouping
              </label>
              <div className="flex flex-wrap gap-2">
                {GROUPINGS.map((g) => (
                  <button
                    key={g.label}
                    className={`px-3 py-1.5 text-label-sm rounded-full transition-colors ${
                      g.active
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button className="w-full bg-primary text-white text-label-md py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Update Preview
              </button>
            </div>
          </div>

          {/* Preview area */}
          <div className="lg:col-span-9 p-8 bg-white min-h-[600px]">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-headline-sm">Operational Sustainability Preview</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Data synthesized from 24 global facilities • Last updated 2 hours ago
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Icon name="zoom_in" className="text-on-surface-variant cursor-pointer hover:text-primary" />
                <Icon name="fullscreen" className="text-on-surface-variant cursor-pointer hover:text-primary" />
              </div>
            </div>

            {/* Mock chart */}
            <div className="w-full h-80 relative bg-surface-container-low/20 rounded-xl border border-dashed border-outline-variant overflow-hidden">
              <div className="absolute inset-0 p-8 flex items-end justify-between">
                {BARS.map((b, i) => (
                  <div key={i} className={`w-16 rounded-t-lg transition-all duration-700 ${b}`} />
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="border-t border-outline-variant/30 w-full" />
                ))}
              </div>
            </div>

            {/* Preview table */}
            <div className="mt-8 overflow-x-auto border border-outline-variant rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-on-surface/5 text-label-md text-on-surface-variant">
                  <tr>
                    <th className="px-6 py-4">Facility Name</th>
                    <th className="px-6 py-4">CO2e Emissions (MT)</th>
                    <th className="px-6 py-4">Energy Usage (MWh)</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-body-sm text-on-surface">
                  {PREVIEW_ROWS.map((row) => (
                    <tr
                      key={row.name}
                      className="border-t border-outline-variant hover:bg-surface-container-low transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">{row.name}</td>
                      <td className="px-6 py-4">{row.co2}</td>
                      <td className="px-6 py-4">{row.energy}</td>
                      <td className="px-6 py-4">
                        {row.status === 'OPTIMIZED' ? (
                          <span className="px-3 py-1 bg-[#d1fae5] text-[#065f46] rounded-full text-[11px] font-semibold">
                            OPTIMIZED
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-[#fef3c7] text-[#92400e] rounded-full text-[11px] font-semibold">
                            ATTENTION
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}
