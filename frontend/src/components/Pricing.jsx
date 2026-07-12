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
    <section className="py-24 bg-surface" id="pricing">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        <div className="text-center mb-16">
          <h2 className="text-display-lg font-bold">Scalable Pricing for Every Mission</h2>
          <p className="text-on-surface-variant mt-4">
            Transparent plans designed to grow with your sustainability goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
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
  const priceSize = plan.price === 'Custom' ? 'text-[32px]' : 'text-[40px]'
  return (
    <div className="bg-white border border-outline-variant p-10 rounded-2xl flex flex-col">
      <h3 className="text-headline-sm mb-2">{plan.name}</h3>
      <p className="text-body-sm text-on-surface-variant mb-6">{plan.desc}</p>
      <div className="mb-8">
        <span className={`${priceSize} font-extrabold`}>{plan.price}</span>
        {plan.per && <span className="text-on-surface-variant">{plan.per}</span>}
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={`flex items-center gap-3 text-body-md ${f.included ? '' : 'opacity-40'}`}
          >
            <Icon name={f.included ? 'check' : 'close'} className="text-primary text-[18px]" />
            {f.label}
          </li>
        ))}
      </ul>
      <button className="w-full border border-primary text-primary text-label-md py-4 rounded-xl hover:bg-primary hover:text-white transition-all">
        {plan.cta}
      </button>
    </div>
  )
}

function FeaturedPlan({ plan }) {
  return (
    <div className="bg-primary border border-primary p-10 rounded-2xl flex flex-col text-white transform md:scale-105 shadow-2xl relative">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-on-primary-container text-white text-label-sm py-1 px-4 rounded-full font-bold whitespace-nowrap">
        MOST POPULAR
      </div>
      <h3 className="text-headline-sm mb-2">{plan.name}</h3>
      <p className="text-body-sm text-on-primary/80 mb-6">{plan.desc}</p>
      <div className="mb-8">
        <span className="text-[40px] font-extrabold">{plan.price}</span>
        <span className="text-on-primary/80">{plan.per}</span>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-center gap-3 text-body-md">
            <Icon name="check" className="text-primary-fixed text-[18px]" />
            {f.label}
          </li>
        ))}
      </ul>
      <button className="w-full bg-white text-primary text-label-md py-4 rounded-xl hover:bg-surface-variant transition-all">
        {plan.cta}
      </button>
    </div>
  )
}
