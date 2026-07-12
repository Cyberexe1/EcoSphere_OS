import Icon from './Icon.jsx'

const PLATFORM_LINKS = ['Features', 'Modules', 'Integrations', 'Enterprise', 'Pricing']
const RESOURCE_LINKS = ['ESG Blog', 'White Papers', 'Support Center', 'Documentation', 'About']
const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Settings']
const SOCIAL_ICONS = ['public', 'hub', 'monitoring']

export default function Footer() {
  return (
    <footer className="w-full py-12 px-container-padding bg-inverse-surface text-surface-variant border-t border-white/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-card-gap">
        <div className="space-y-6">
          <span className="text-headline-sm text-primary-fixed-dim font-extrabold">EcoSphere</span>
          <p className="text-body-sm">
            Data Transparency for a Greener Future. Built for the modern enterprise, designed for
            the planet.
          </p>
          <div className="flex gap-4">
            {SOCIAL_ICONS.map((icon) => (
              <Icon
                key={icon}
                name={icon}
                className="cursor-pointer hover:text-white transition-colors"
              />
            ))}
          </div>
        </div>

        <FooterColumn title="Platform" links={PLATFORM_LINKS} />
        <FooterColumn title="Resources" links={RESOURCE_LINKS} />

        <div className="space-y-6">
          <h4 className="text-white font-bold text-label-md">Stay Updated</h4>
          <p className="text-body-sm">Subscribe for the latest ESG regulatory news.</p>
          <form
            className="flex border border-outline-variant rounded-lg overflow-hidden h-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="bg-transparent px-4 py-2 border-none focus:outline-none focus:ring-0 text-white flex-grow text-body-sm placeholder:text-surface-variant/60"
              placeholder="Email address"
              type="email"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 material-symbols-outlined"
              aria-label="Subscribe"
            >
              send
            </button>
          </form>
        </div>

        <div className="col-span-1 md:col-span-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-body-sm text-surface-variant/60">
            © 2024 EcoSphere ESG Management. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-body-sm text-surface-variant/60">
            {LEGAL_LINKS.map((link) => (
              <a key={link} className="hover:text-white" href="#">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div className="space-y-4">
      <h4 className="text-white font-bold text-label-md">{title}</h4>
      <ul className="space-y-2 text-body-sm">
        {links.map((link) => (
          <li key={link}>
            <a className="hover:text-primary-fixed transition-all" href="#">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
