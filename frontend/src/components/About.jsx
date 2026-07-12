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
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="about">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding">
        {/* Mission */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary font-bold text-label-md tracking-widest uppercase">
            About EcoSphere
          </span>
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold mt-3 mb-4 sm:mb-6 tracking-tight">
            Data Transparency for a Greener Future
          </h2>
          <p className="text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed">
            EcoSphere was built for the modern enterprise, designed for the planet. We're on a
            mission to make sustainability measurable, actionable, and accessible to every
            organization — regardless of size or industry. Our platform transforms complex ESG data
            into clear strategies that drive real environmental impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 sm:p-6 bg-gradient-to-br from-surface-container to-white rounded-xl border border-outline-variant/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-[24px] sm:text-[32px] md:text-[40px] font-extrabold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-body-sm text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-headline-sm sm:text-headline-md font-bold">Our Core Values</h3>
          <p className="text-body-sm sm:text-body-md text-on-surface-variant mt-2 max-w-lg mx-auto">
            The principles that guide everything we build and every decision we make.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map((value) => (
            <div key={value.title} className="text-center space-y-3 sm:space-y-4 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon name={value.icon} className="text-[24px] sm:text-[28px]" />
              </div>
              <h4 className="text-body-lg sm:text-headline-sm font-bold">{value.title}</h4>
              <p className="text-body-sm sm:text-body-md text-on-surface-variant px-2 sm:px-4 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
