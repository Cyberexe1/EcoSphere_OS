import Icon from './Icon.jsx'

const PLANS = [
  {
    name: 'Impact Starter',
    desc: 'Perfect for small teams beginning their ESG journey.',
    price: '$499',
    per: '/mo',
    featured: false,
    features: [
      { label: 'Environmental Module', included: true },
      { label: 'Scope 1 & 2 Tracking', included: true },
      { label: 'Annual PDF Report', included: true },
      { label: 'Supply Chain Analytics', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Core Enterprise',
    desc: 'End-to-end management for established corporations.',
    price: '$1,299',
    per: '/mo',
    featured: true,
    features: [
      { label: 'All Core Modules', included: true },
      { label: 'Real-time Dashboard', included: true },
      { label: 'API Integrations', included: true },
      { label: 'Framework Alignment', included: true },
    ],
    cta: 'Choose Enterprise',
  },
  {
    name: 'Global Visionary',
    desc: 'Custom solutions for massive multi-national conglomerates.',
    price: 'Custom',
    per: '',
    featured: false,
    features: [
      { label: 'Bespoke Reporting Engine', included: true },
      { label: 'Dedicated ESG Consultant', included: true },
      { label: 'On-premise Deployment', included: true },
      { label: 'Unlimited Global Users', included: true },
    ],
    cta: 'Contact Sales',
  },
]

export default function Pricing() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface" id="pricing">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-primary font-bold text-label-md tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-display-lg font-bold mt-3">
            Scalable Pricing for Every Mission
          </h2>
          <p className="text-body-md sm:text-body-lg text-on-surface-variant mt-3 max-w-xl mx-auto">
            Transparent plans designed to grow with your sustainability goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PLANS.map((plan) =>
            plan.featured ? (
              <FeaturedPlan key={plan.name} plan={plan} />
            ) : (
              <StandardPlan key={plan.name} plan={plan} />
            )
          )}
        </div>
      </div>
    </section>
  )
}

function StandardPlan({ plan }) {
  const priceSize = plan.price === 'Custom' ? 'text-[28px] sm:text-[32px]' : 'text-[32px] sm:text-[40px]'
  return (
    <div className="bg-white border border-outline-variant p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <h3 className="text-body-lg sm:text-headline-sm font-bold mb-2">{plan.name}</h3>
      <p className="text-body-sm text-on-surface-variant mb-5 sm:mb-6">{plan.desc}</p>
      <div className="mb-6 sm:mb-8">
        <span className={`${priceSize} font-extrabold`}>{plan.price}</span>
        {plan.per && <span className="text-on-surface-variant">{plan.per}</span>}
      </div>
      <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={`flex items-center gap-3 text-body-sm sm:text-body-md ${f.included ? '' : 'opacity-40'}`}
          >
            <Icon name={f.included ? 'check' : 'close'} className="text-primary text-[16px] sm:text-[18px]" />
            {f.label}
          </li>
        ))}
      </ul>
      <button className="w-full border border-primary text-primary text-label-md py-3.5 sm:py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
        {plan.cta}
      </button>
    </div>
  )
}

function FeaturedPlan({ plan }) {
  return (
    <div className="bg-primary border border-primary p-6 sm:p-8 lg:p-10 rounded-2xl flex flex-col text-white transform md:scale-105 shadow-2xl shadow-primary/20 relative">
      <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-on-primary-container text-white text-[11px] sm:text-label-sm py-1 px-3 sm:px-4 rounded-full font-bold whitespace-nowrap">
        MOST POPULAR
      </div>
      <h3 className="text-body-lg sm:text-headline-sm font-bold mb-2">{plan.name}</h3>
      <p className="text-body-sm text-on-primary/80 mb-5 sm:mb-6">{plan.desc}</p>
      <div className="mb-6 sm:mb-8">
        <span className="text-[32px] sm:text-[40px] font-extrabold">{plan.price}</span>
        <span className="text-on-primary/80">{plan.per}</span>
      </div>
      <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-center gap-3 text-body-sm sm:text-body-md">
            <Icon name="check" className="text-primary-fixed text-[16px] sm:text-[18px]" />
            {f.label}
          </li>
        ))}
      </ul>
      <button className="w-full bg-white text-primary text-label-md py-3.5 sm:py-4 rounded-xl hover:bg-surface-variant hover:shadow-lg transition-all duration-300">
        {plan.cta}
      </button>
    </div>
  )
}
