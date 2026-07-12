import Icon from './Icon.jsx'

const STEPS = [
  {
    n: '1',
    icon: 'cable',
    title: 'Connect Data',
    desc: 'Directly link your ERP, utility accounts, and supply chain spreadsheets.',
  },
  {
    n: '2',
    icon: 'analytics',
    title: 'Analyze Impact',
    desc: 'Our AI engine cleans the data and benchmarks you against industry leaders.',
  },
  {
    n: '3',
    icon: 'rocket_launch',
    title: 'Report & Act',
    desc: 'Generate certified reports and execute data-driven reduction plans.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary font-bold text-label-md tracking-widest uppercase">
            How It Works
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-display-lg font-bold mt-3">
            Your Path to Modern Governance
          </h2>
          <p className="text-body-md sm:text-body-lg text-on-surface-variant mt-3 max-w-xl mx-auto">
            Get up and running in three simple steps. No complex onboarding required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          </div>
          {STEPS.map((step) => (
            <div key={step.n} className="relative z-10 text-center space-y-4 sm:space-y-5 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-2 border-primary/30 group-hover:border-primary rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/5 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10">
                <Icon name={step.icon} className="text-primary text-[28px] sm:text-[32px]" />
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-label-sm font-bold">
                {step.n}
              </div>
              <h3 className="text-body-lg sm:text-headline-sm font-bold">{step.title}</h3>
              <p className="text-body-sm sm:text-body-md text-on-surface-variant px-2 sm:px-6 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
