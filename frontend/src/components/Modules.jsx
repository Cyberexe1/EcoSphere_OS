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
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-container-low" id="modules">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-primary font-bold text-label-md tracking-widest uppercase">
            Platform Modules
          </span>
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold mb-3 sm:mb-4 mt-3 tracking-tight">
            Modular Sustainability Intelligence
          </h2>
          <p className="text-body-md sm:text-body-lg text-on-surface-variant">
            Choose the specialized modules that fit your organization's unique ESG journey.
            Integrated seamlessly, deployed instantly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {MODULES.map((m) => (
            <div
              key={m.title}
              className="bg-white p-6 sm:p-8 rounded-xl border border-outline-variant hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 ${m.iconBg} ${m.iconColor} rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={m.icon} />
              </div>
              <h3 className="text-body-lg sm:text-headline-sm font-bold mb-2">{m.title}</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
