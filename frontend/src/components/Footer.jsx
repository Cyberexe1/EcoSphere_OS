import Icon from './Icon.jsx'

const PLATFORM_LINKS = ['Features', 'Modules', 'Integrations', 'Enterprise', 'Pricing']
const RESOURCE_LINKS = ['ESG Blog', 'White Papers', 'Support Center', 'Documentation', 'About']
const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Settings']
const SOCIAL_ICONS = ['public', 'hub', 'monitoring']

export default function Footer() {
  return (
    <footer className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-container-padding bg-inverse-surface text-surface-variant border-t border-white/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-card-gap">
        <div className="space-y-4 sm:space-y-6 sm:col-span-2 md:col-span-1">
          <span className="text-headline-sm text-primary-fixed-dim font-extrabold">EcoSphere</span>
          <p className="text-body-sm max-w-xs">
            Data Transparency for a Greener Future. Built for the modern enterprise, designed for
            the planet.
          </p>
          <div className="flex gap-3 sm:gap-4">
            {SOCIAL_ICONS.map((icon) => (
              <div
                key={icon}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Icon
                  name={icon}
                  className="text-[18px] hover:text-white transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <FooterColumn title="Platform" links={PLATFORM_LINKS} />
        <FooterColumn title="Resources" links={RESOURCE_LINKS} />

        <div className="space-y-4 sm:space-y-6 sm:col-span-2 md:col-span-1">
          <h4 className="text-white font-bold text-label-md">Stay Updated</h4>
          <p className="text-body-sm">Subscribe for the latest ESG regulatory news.</p>
          <form
            className="flex border border-outline-variant/50 rounded-lg overflow-hidden h-11 sm:h-12 hover:border-primary/50 transition-colors"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="bg-transparent px-3 sm:px-4 py-2 border-none focus:outline-none focus:ring-0 text-white flex-grow text-body-sm placeholder:text-surface-variant/60 min-w-0"
              placeholder="Email address"
              type="email"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-primary text-white px-3 sm:px-4 material-symbols-outlined hover:bg-primary/90 transition-colors flex-shrink-0"
              aria-label="Subscribe"
            >
              send
            </button>
          </form>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-4 pt-8 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-body-sm text-surface-variant/60 text-center sm:text-left">
            © 2024 EcoSphere ESG Management. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-body-sm text-surface-variant/60">
            {LEGAL_LINKS.map((link) => (
              <a key={link} className="hover:text-white transition-colors" href="#">
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
    <div className="space-y-3 sm:space-y-4">
      <h4 className="text-white font-bold text-label-md">{title}</h4>
      <ul className="space-y-2 sm:space-y-2.5 text-body-sm">
        {links.map((link) => (
          <li key={link}>
            <a className="hover:text-primary-fixed transition-all hover:translate-x-0.5 inline-block" href="#">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
