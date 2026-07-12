import Icon from './Icon.jsx'

const STATS = [
  { value: '2,500+', label: 'Enterprises Globally' },
  { value: '120+', label: 'Countries Covered' },
  { value: '500+', label: 'Frameworks Supported' },
  { value: '70%', label: 'Avg. Reporting Time Saved' },
]

const VALUES = [
  {
    icon: 'visibility',
    title: 'Radical Transparency',
    desc: 'We believe sustainability starts with honest, accessible data. No greenwashing, no hidden metrics.',
  },
  {
    icon: 'precision_manufacturing',
    title: 'Scientific Rigor',
    desc: 'Every calculation follows peer-reviewed methodologies aligned with GHG Protocol and IPCC standards.',
  },
  {
    icon: 'handshake',
    title: 'Collaborative Impact',
    desc: 'We build tools that bring teams together — from boardrooms to supply chains — around shared goals.',
  },
]

export default function About() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        {/* Mission */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-primary font-bold text-label-md tracking-widest uppercase">
            About EcoSphere
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold mt-3 mb-6 tracking-tight">
            Data Transparency for a Greener Future
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            EcoSphere was built for the modern enterprise, designed for the planet. We're on a
            mission to make sustainability measurable, actionable, and accessible to every
            organization — regardless of size or industry. Our platform transforms complex ESG data
            into clear strategies that drive real environmental impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-surface-container rounded-xl border border-outline-variant"
            >
              <p className="text-[32px] md:text-[40px] font-extrabold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-body-sm text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h3 className="text-headline-md font-bold">Our Core Values</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value) => (
            <div key={value.title} className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name={value.icon} className="text-[28px]" />
              </div>
              <h4 className="text-headline-sm font-bold">{value.title}</h4>
              <p className="text-body-md text-on-surface-variant px-4">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
