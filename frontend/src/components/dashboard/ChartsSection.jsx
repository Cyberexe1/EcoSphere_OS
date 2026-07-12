import Icon from '../Icon.jsx'
import { EcoLineChart, EcoBarChart } from '../charts/EcoCharts.jsx'

const EMISSIONS = [
  { month: 'Jan', actual: 42, target: 40 },
  { month: 'Feb', actual: 39, target: 38 },
  { month: 'Mar', actual: 41, target: 36 },
  { month: 'Apr', actual: 34, target: 34 },
  { month: 'May', actual: 30, target: 32 },
  { month: 'Jun', actual: 28, target: 30 },
  { month: 'Jul', actual: 24, target: 28 },
  { month: 'Aug', actual: 26, target: 26 },
]

const RANKING = [
  { name: 'EcoSphere', score: 95 },
  { name: 'Regional Target', score: 85 },
  { name: 'Industry Avg', score: 60 },
]

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
      {/* Emissions Trend */}
      <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-xl border border-black/[0.04] shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
              <Icon name="show_chart" className="text-[18px] text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Emissions Trend</h3>
              <p className="text-xs text-on-surface-variant">
                Carbon intensity (CO2e) per unit of revenue
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Legend color="bg-emerald-500" label="Actual" />
            <Legend color="bg-black/15" label="Target" dashed />
          </div>
        </div>
        <EcoLineChart
          data={EMISSIONS}
          xKey="month"
          lines={[
            { key: 'actual', name: 'Actual', color: '#10b981' },
            { key: 'target', name: 'Target', color: '#bbcabf', dashed: true },
          ]}
        />
      </div>

      {/* Governance ESG Ranking */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-black/[0.04] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center">
            <Icon name="leaderboard" className="text-[18px] text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">ESG Ranking</h3>
            <p className="text-xs text-on-surface-variant">Competitor benchmark</p>
          </div>
        </div>
        <EcoBarChart
          data={RANKING}
          xKey="name"
          layout="vertical"
          height={170}
          bars={[{ key: 'score', name: 'Percentile', color: '#005ac2', colors: ['#1b5e3b', '#2563eb', '#94a3b8'] }]}
        />
        <div className="mt-auto pt-4">
          <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100/50">
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="trending_up" className="text-emerald-600 text-[16px]" />
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Board diversity and transparency scores increased your rank by <span className="font-bold">12 points</span> this quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend({ color, label, dashed }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-3 h-[3px] rounded-full ${color} ${dashed ? 'opacity-50' : ''}`} />
      <span className="text-[11px] font-medium text-on-surface-variant">{label}</span>
    </div>
  )
}
