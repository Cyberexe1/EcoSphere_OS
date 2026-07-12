import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'

const CARDS = [
  {
    label: 'Overall ESG',
    value: '8.1',
    trend: '+0.4',
    trendUp: true,
    trendLabel: 'Than last quarter',
    icon: 'monitoring',
    gradient: 'from-[#1b5e3b] to-[#2e7d52]',
    trendColor: 'bg-white/20 text-white',
    iconBg: 'bg-white/15',
    iconColor: 'text-white',
    textColor: 'text-white',
    subtextColor: 'text-white/60',
    to: '/reports',
  },
  {
    label: 'Environmental',
    value: '7.8',
    trend: '+0.2',
    trendUp: true,
    trendLabel: 'Than last quarter',
    icon: 'eco',
    gradient: 'from-[#14532d] to-[#166534]',
    trendColor: 'bg-white/20 text-white',
    iconBg: 'bg-white/15',
    iconColor: 'text-white',
    textColor: 'text-white',
    subtextColor: 'text-white/60',
    sparkPath: 'M0,35 Q25,10 50,25 T100,5',
    sparkColor: 'rgba(255,255,255,0.3)',
    to: '/environmental',
  },
  {
    label: 'Social',
    value: '7.4',
    trend: '0.0',
    trendUp: null,
    trendLabel: 'Than last quarter',
    icon: 'group',
    gradient: 'from-[#1e3a5f] to-[#2563eb]',
    trendColor: 'bg-white/20 text-white',
    iconBg: 'bg-white/15',
    iconColor: 'text-white',
    textColor: 'text-white',
    subtextColor: 'text-white/60',
    sparkPath: 'M0,20 L20,20 L40,25 L60,15 L80,20 L100,20',
    sparkColor: 'rgba(255,255,255,0.3)',
    to: '/social',
  },
  {
    label: 'Governance',
    value: '8.5',
    trend: '+0.8',
    trendUp: true,
    trendLabel: 'Than last quarter',
    icon: 'gavel',
    gradient: 'from-[#1e293b] to-[#334155]',
    trendColor: 'bg-white/20 text-white',
    iconBg: 'bg-white/15',
    iconColor: 'text-white',
    textColor: 'text-white',
    subtextColor: 'text-white/60',
    sparkPath: 'M0,38 L15,30 L30,35 L50,15 L75,10 L100,2',
    sparkColor: 'rgba(255,255,255,0.3)',
    to: '/governance',
  },
]

export default function ScoreCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
      {CARDS.map((card) => (
        <Link
          key={card.label}
          to={card.to}
          className={`relative overflow-hidden p-4 sm:p-5 rounded-xl bg-gradient-to-br ${card.gradient} shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group block focus:outline-none focus:ring-2 focus:ring-primary/20`}
        >
          {/* Subtle decorative glow */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <Icon name={card.icon} className={`text-[16px] ${card.iconColor}`} />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wide ${card.subtextColor}`}>
                  {card.label}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <span className={`text-3xl font-extrabold tracking-tight ${card.textColor}`}>{card.value}</span>
              <span className={`text-sm ml-1 ${card.subtextColor}`}>/ 10.0</span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${card.trendColor}`}>
                <Icon
                  name={card.trendUp === null ? 'trending_flat' : 'trending_up'}
                  className="text-[12px]"
                />
                {card.trend}
              </span>
              <span className={`text-[11px] ${card.subtextColor}`}>{card.trendLabel}</span>
            </div>
          </div>

          {/* Spark line */}
          {card.sparkPath && (
            <svg className="absolute bottom-3 right-4 h-10 w-20 opacity-40 group-hover:opacity-70 transition-opacity duration-300" viewBox="0 0 100 40">
              <path d={card.sparkPath} fill="none" stroke={card.sparkColor} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </Link>
      ))}
    </div>
  )
}
