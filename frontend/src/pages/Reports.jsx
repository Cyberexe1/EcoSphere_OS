import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/ui/Modal.jsx'
import Badge from '../components/ui/Badge.jsx'
import { useToast } from '../components/ui/Toast.jsx'
import { exportToCsv } from '../utils/csv.js'

const REPORT_TYPES = [
  { icon: 'forest', title: 'Environmental', desc: 'Carbon footprint, energy efficiency metrics, and water usage analysis across all facilities.' },
  { icon: 'diversity_3', title: 'Social', desc: 'Workforce diversity, employee turnover, and community impact programs and engagement.' },
  { icon: 'account_balance', title: 'Governance', desc: 'Board structure, executive compensation, and compliance tracking with global regulations.' },
  { icon: 'analytics', title: 'ESG Summary', desc: 'A holistic overview combining all pillars into a single stakeholder-ready executive summary.' },
]

const METRICS = ['CO2e Emissions', 'Renewable Energy %', 'Water Recycled', 'Waste to Landfill']
const GROUPINGS = ['By Month', 'By Site', 'By Pillar']
const BARS = ['h-[60%] bg-primary-container', 'h-[40%] bg-primary', 'h-[85%] bg-primary-container', 'h-[55%] bg-primary', 'h-[70%] bg-primary-container', 'h-[95%] bg-primary', 'h-[30%] bg-primary-container', 'h-[50%] bg-primary']

const PREVIEW_ROWS = [
  { facility: 'Oslo Central Hub', co2: '1,240.5', energy: '3,890', status: 'OPTIMIZED' },
  { facility: 'Berlin Production Plant B', co2: '4,560.2', energy: '12,100', status: 'ATTENTION' },
  { facility: 'Singapore Logistics Center', co2: '890.4', energy: '2,150', status: 'OPTIMIZED' },
]

export default function Reports() {
  const toast = useToast()
  const [metrics, setMetrics] = useState({ 'CO2e Emissions': true, 'Water Recycled': true })
  const [grouping, setGrouping] = useState('By Month')
  const [dataSource, setDataSource] = useState('Global Operations')
  const [previewMeta, setPreviewMeta] = useState({ source: 'Global Operations', grouping: 'By Month' })
  const [fullscreen, setFullscreen] = useState(false)
  const [generating, setGenerating] = useState(null)

  const toggleMetric = (m) => setMetrics((prev) => ({ ...prev, [m]: !prev[m] }))

  const generate = (title) => {
    setGenerating(title)
    setTimeout(() => {
      setGenerating(null)
      toast(`${title} report generated.`, 'success')
    }, 900)
  }

  const updatePreview = () => {
    setPreviewMeta({ source: dataSource, grouping })
    toast('Preview updated.', 'info')
  }

  const exportCsv = () => {
    exportToCsv('esg-report', PREVIEW_ROWS, [
      { key: 'facility', label: 'Facility Name' },
      { key: 'co2', label: 'CO2e Emissions (MT)' },
      { key: 'energy', label: 'Energy Usage (MWh)' },
      { key: 'status', label: 'Status' },
    ])
    toast('Report exported to CSV.', 'info')
  }

  const previewTable = (
    <div className="overflow-x-auto border border-outline-variant rounded-xl">
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
            <tr key={row.facility} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
              <td className="px-6 py-4 font-medium">{row.facility}</td>
              <td className="px-6 py-4">{row.co2}</td>
              <td className="px-6 py-4">{row.energy}</td>
              <td className="px-6 py-4">
                <Badge tone={row.status === 'OPTIMIZED' ? 'success' : 'warning'}>{row.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <DashboardLayout title="Reports">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-5 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Reports &amp; Analytics</h1>
          <p className="text-sm text-on-surface-variant mt-0.5 max-w-xl">
            Generate automated ESG disclosures or build custom analytical views.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-black/[0.06] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Sync: Active</span>
        </div>
      </div>

      {/* Report type cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {REPORT_TYPES.map((r) => (
          <div key={r.title} className="bg-white border border-black/[0.04] p-5 rounded-xl hover:shadow-md transition-all duration-300 group shadow-sm">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-100 to-green-50 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon name={r.icon} className="text-[18px] text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold mb-1.5 text-on-surface">{r.title}</h3>
            <p className="text-xs text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">{r.desc}</p>
            <button
              onClick={() => generate(r.title)}
              disabled={generating === r.title}
              className="w-full py-2 px-3 bg-gradient-to-r from-[#1b5e3b] to-[#2e7d52] text-white text-xs font-semibold rounded-lg hover:shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {generating === r.title ? (
                <>
                  <Icon name="progress_activity" className="text-[14px] animate-spin" /> Generating…
                </>
              ) : (
                <>
                  Generate <Icon name="auto_awesome" className="text-[14px]" />
                </>
              )}
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
            <button onClick={() => toast('PDF export queued.', 'info')} className="px-4 py-2 text-on-surface-variant text-label-md flex items-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors">
              <Icon name="picture_as_pdf" className="text-[18px]" /> Export PDF
            </button>
            <button onClick={() => toast('Excel export queued.', 'info')} className="px-4 py-2 text-on-surface-variant text-label-md flex items-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors">
              <Icon name="table_chart" className="text-[18px]" /> Excel
            </button>
            <button onClick={exportCsv} className="px-4 py-2 text-on-surface-variant text-label-md flex items-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors">
              <Icon name="csv" className="text-[18px]" /> CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Controls */}
          <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-outline-variant bg-surface-container-low/30 space-y-6">
            <label className="block space-y-1.5">
              <span className="text-label-md text-on-surface-variant uppercase tracking-wide">Data Source</span>
              <select value={dataSource} onChange={(e) => setDataSource(e.target.value)} className="input">
                <option>Global Operations</option>
                <option>North American Division</option>
                <option>European Supply Chain</option>
                <option>Asia-Pacific Facilities</option>
              </select>
            </label>
            <div>
              <span className="block text-label-md text-on-surface-variant uppercase tracking-wide mb-2">Primary Metric</span>
              <div className="space-y-2 mt-3">
                {METRICS.map((m) => (
                  <label key={m} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={!!metrics[m]} onChange={() => toggleMetric(m)} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                    <span className="text-body-sm text-on-surface group-hover:text-primary transition-colors">{m}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-label-md text-on-surface-variant uppercase tracking-wide mb-2">Grouping</span>
              <div className="flex flex-wrap gap-2">
                {GROUPINGS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrouping(g)}
                    className={`px-3 py-1.5 text-label-sm rounded-full transition-colors ${grouping === g ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <button onClick={updatePreview} className="w-full bg-primary text-white text-label-md py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Update Preview
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-9 p-8 bg-white min-h-[600px]">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-headline-sm">{previewMeta.source} · {previewMeta.grouping}</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Metrics: {Object.keys(metrics).filter((m) => metrics[m]).join(', ') || 'none selected'} • Last updated 2 hours ago
                </p>
              </div>
              <button onClick={() => setFullscreen(true)} className="text-on-surface-variant hover:text-primary" aria-label="Fullscreen preview">
                <Icon name="fullscreen" />
              </button>
            </div>

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

            <div className="mt-8">{previewTable}</div>
          </div>
        </div>
      </section>

      {/* Fullscreen preview modal */}
      <Modal open={fullscreen} onClose={() => setFullscreen(false)} title="Report Preview" subtitle={`${previewMeta.source} · ${previewMeta.grouping}`} size="xl">
        {previewTable}
      </Modal>
    </DashboardLayout>
  )
}
