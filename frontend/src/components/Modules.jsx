import Icon from './Icon.jsx'

const MODULES = [
  {
    icon: 'eco',
    title: 'Environmental',
    desc: 'Scope 1, 2 & 3 tracking, carbon accounting, and waste reduction.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: 'group',
    title: 'Social',
    desc: 'Diversity tracking, labor safety metrics, and community engagement.',
    iconBg: 'bg-blue-100',
    iconColor: 'text-tertiary',
  },
  {
    icon: 'gavel',
    title: 'Governance',
    desc: 'Compliance audits, risk management, and ethics reporting.',
    iconBg: 'bg-amber-100',
    iconColor: 'text-on-secondary-fixed-variant',
  },
  {
    icon: 'military_tech',
    title: 'Gamification',
    desc: 'Employee engagement challenges and sustainability rewards.',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-on-primary-fixed-variant',
  },
  {
    icon: 'description',
    title: 'Reports',
    desc: 'One-click BRSR, GRI, and SASB compliant reporting exports.',
    iconBg: 'bg-slate-100',
    iconColor: 'text-on-surface-variant',
  },
]

export default function Modules() {
  return (
    <section className="py-24 bg-surface-container-low" id="modules">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold mb-4 tracking-tight">
            Modular Sustainability Intelligence
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Choose the specialized modules that fit your organization's unique ESG journey.
            Integrated seamlessly, deployed instantly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MODULES.map((m) => (
            <div
              key={m.title}
              className="bg-white p-8 rounded-xl border border-outline-variant hover:border-primary/50 transition-all group"
            >
              <div
                className={`w-12 h-12 ${m.iconBg} ${m.iconColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Icon name={m.icon} />
              </div>
              <h3 className="text-headline-sm mb-2">{m.title}</h3>
              <p className="text-body-sm text-on-surface-variant">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
