const STEPS = [
  {
    n: '1',
    title: 'Connect Data',
    desc: 'Directly link your ERP, utility accounts, and supply chain spreadsheets.',
  },
  {
    n: '2',
    title: 'Analyze Impact',
    desc: 'Our AI engine cleans the data and benchmarks you against industry leaders.',
  },
  {
    n: '3',
    title: 'Report & Act',
    desc: 'Generate certified reports and execute data-driven reduction plans.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        <div className="text-center mb-20">
          <h2 className="text-display-lg font-bold">Your Path to Modern Governance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[2px] bg-outline-variant/30 z-0" />
          {STEPS.map((step) => (
            <div key={step.n} className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 bg-white border-2 border-primary rounded-full flex items-center justify-center mx-auto text-headline-md font-bold text-primary">
                {step.n}
              </div>
              <h3 className="text-headline-sm">{step.title}</h3>
              <p className="text-body-md text-on-surface-variant px-6">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
