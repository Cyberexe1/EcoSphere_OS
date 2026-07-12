import Icon from '../Icon.jsx'

const MONTHS = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov']

const RANKINGS = [
  { label: 'EcoSphere (You)', value: 'Top 5%', width: 'w-[95%]', bar: 'bg-tertiary', bold: true },
  { label: 'Industry Avg', value: 'Top 40%', width: 'w-[60%]', bar: 'bg-tertiary-container' },
  { label: 'Regional Target', value: 'Top 15%', width: 'w-[85%]', bar: 'bg-tertiary-fixed-dim' },
]

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-card-gap mb-8">
      {/* Emissions Trend */}
      <div className="lg:col-span-2 glass-card p-8 rounded-xl">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
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
        <div className="h-64 w-full relative">
          <div className="absolute inset-0 flex flex-col justify-between border-b border-outline-variant">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-full border-t border-outline-variant/30" />
            ))}
          </div>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 L100,180 L250,210 L400,160 L600,140 L800,100 L1000,120"
              fill="none"
              stroke="#10B981"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d="M0,190 L1000,100"
              fill="none"
              stroke="#bbcabf"
              strokeDasharray="8 4"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="flex justify-between mt-4 px-2">
          {MONTHS.map((m) => (
            <span key={m} className="text-label-sm text-on-surface-variant">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Governance ESG Ranking */}
      <div className="glass-card p-8 rounded-xl">
        <h3 className="text-headline-sm text-on-surface mb-1">Governance ESG Ranking</h3>
        <p className="text-body-sm text-on-surface-variant mb-8">Competitor benchmark analysis</p>
        <div className="space-y-6">
          {RANKINGS.map((r) => (
            <div key={r.label} className="space-y-2">
              <div className="flex justify-between text-label-md">
                <span>{r.label}</span>
                <span className={r.bold ? 'font-bold' : 'text-on-surface-variant'}>{r.value}</span>
              </div>
              <div className="h-4 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className={`h-full ${r.bar} ${r.width}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-4 bg-tertiary/5 rounded-lg border border-tertiary/10">
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
