import Icon from './Icon.jsx'

const RESOURCES = [
  {
    icon: 'article',
    title: 'ESG Blog',
    desc: 'Industry insights, regulatory updates, and best practices for sustainability leaders.',
    link: '#',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: 'description',
    title: 'White Papers',
    desc: 'In-depth research on carbon accounting, supply chain transparency, and ESG frameworks.',
    link: '#',
    iconBg: 'bg-blue-100',
    iconColor: 'text-tertiary',
  },
  {
    icon: 'menu_book',
    title: 'Documentation',
    desc: 'Technical guides, API references, and integration tutorials for your development team.',
    link: '#',
    iconBg: 'bg-amber-100',
    iconColor: 'text-on-secondary-fixed-variant',
  },
  {
    icon: 'support_agent',
    title: 'Support Center',
    desc: 'Get help from our dedicated team of ESG specialists and platform experts.',
    link: '#',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-on-primary-fixed-variant',
  },
  {
    icon: 'school',
    title: 'ESG Academy',
    desc: 'Free courses and certifications on sustainability reporting and compliance standards.',
    link: '#',
    iconBg: 'bg-green-100',
    iconColor: 'text-primary',
  },
  {
    icon: 'videocam',
    title: 'Webinars & Events',
    desc: 'Live sessions with industry experts on emerging ESG trends and regulatory changes.',
    link: '#',
    iconBg: 'bg-slate-100',
    iconColor: 'text-on-surface-variant',
  },
]

export default function Resources() {
  return (
    <section className="py-24 bg-surface-container-low" id="resources">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-label-md tracking-widest uppercase">
            Resources
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold mb-4 mt-3 tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Explore our library of guides, research, and tools to accelerate your sustainability
            journey and stay ahead of evolving ESG regulations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              className="bg-white p-8 rounded-xl border border-outline-variant hover:border-primary/50 hover:shadow-lg transition-all group block"
            >
              <div
                className={`w-12 h-12 ${resource.iconBg} ${resource.iconColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <Icon name={resource.icon} />
              </div>
              <h3 className="text-headline-sm mb-2">{resource.title}</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">{resource.desc}</p>
              <span className="text-label-md text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore
                <Icon name="arrow_forward" className="text-[18px]" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
