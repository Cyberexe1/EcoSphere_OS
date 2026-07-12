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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap mb-8">
      {/* Emissions Trend */}
      <div className="lg:col-span-2 glass-card p-8 rounded-xl">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div>
            <h3 className="text-headline-sm text-on-surface">Emissions Trend</h3>
            <p className="text-body-sm text-on-surface-variant">
              Carbon intensity (CO2e) per unit of revenue
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Legend color="bg-primary" label="Actual" />
            <Legend color="bg-outline-variant" label="Target" />
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
      <div className="glass-card p-8 rounded-xl flex flex-col">
        <h3 className="text-headline-sm text-on-surface mb-1">Governance ESG Ranking</h3>
        <p className="text-body-sm text-on-surface-variant mb-4">Competitor benchmark analysis</p>
        <EcoBarChart
          data={RANKING}
          xKey="name"
          layout="vertical"
          height={180}
          bars={[{ key: 'score', name: 'Percentile', color: '#005ac2', colors: ['#005ac2', '#71a1ff', '#adc6ff'] }]}
        />
        <div className="mt-6 p-4 bg-tertiary/5 rounded-lg border border-tertiary/10">
          <div className="flex gap-3">
            <Icon name="insights" className="text-tertiary" />
            <p className="text-body-sm text-tertiary">
              Board diversity and transparency scores increased your rank by 12 points this quarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-label-sm">{label}</span>
    </div>
  )
}
