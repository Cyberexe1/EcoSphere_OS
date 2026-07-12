const CARDS = [
  {
    label: 'Overall ESG',
    value: '8.1',
    trend: '+0.4',
    trendUp: true,
    badgeClass: 'bg-primary/10 text-primary',
    type: 'bar',
    barWidth: 'w-[81%]',
  },
  {
    label: 'Environmental',
    value: '7.8',
    trend: '+0.2',
    trendUp: true,
    badgeClass: 'bg-secondary-container/30 text-secondary',
    type: 'spark',
    path: 'M0,35 Q25,10 50,25 T100,5',
    stroke: '#10B981',
  },
  {
    label: 'Social',
    value: '7.4',
    trend: '0.0',
    trendUp: null,
    badgeClass: 'bg-tertiary-fixed/30 text-tertiary',
    type: 'spark',
    path: 'M0,20 L20,20 L40,25 L60,15 L80,20 L100,20',
    stroke: '#005ac2',
  },
  {
    label: 'Governance',
    value: '8.5',
    trend: '+0.8',
    trendUp: true,
    badgeClass: 'bg-inverse-surface/10 text-inverse-surface',
    type: 'spark',
    path: 'M0,38 L15,30 L30,35 L50,15 L75,10 L100,2',
    stroke: '#23342c',
  },
]

function TrendIcon({ up }) {
  if (up === null)
    return (
      <span className="text-on-surface-variant font-label-md flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">trending_flat</span> 0.0
      </span>
    )
  return null
}

export default function ScoreCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap mb-8">
      {CARDS.map((card) => (
        <div key={card.label} className="glass-card p-6 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span
              className={`px-3 py-1 rounded-full text-label-md uppercase tracking-wider ${card.badgeClass}`}
            >
              {card.label}
            </span>
            {card.trendUp === null ? (
              <TrendIcon up={null} />
            ) : (
              <span className="text-secondary text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> {card.trend}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-on-surface">{card.value}</span>
            <span className="text-on-surface-variant/60 text-body-sm">/ 10.0</span>
          </div>

          {card.type === 'bar' ? (
            <div className="h-1 w-full bg-surface-variant rounded-full mt-4">
              <div className={`h-full bg-primary rounded-full ${card.barWidth}`} />
            </div>
          ) : (
            <svg className="h-12 w-24 absolute bottom-4 right-4" viewBox="0 0 100 40">
              <path d={card.path} fill="none" stroke={card.stroke} strokeWidth="2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
