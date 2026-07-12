import Icon from '../Icon.jsx'

export default function DashboardFooter() {
  return (
    <footer className="w-full py-12 px-container-padding grid grid-cols-1 md:grid-cols-4 gap-card-gap bg-inverse-surface border-t border-outline/20">
      <div className="md:col-span-1">
        <h2 className="text-headline-sm text-primary-fixed-dim mb-4">EcoSphere</h2>
        <p className="text-body-sm text-surface-variant">
          © 2024 EcoSphere ESG Management. Data Transparency for a Greener Future.
        </p>
      </div>
      <FooterCol title="Product" links={['Features', 'Modules', 'Pricing']} />
      <FooterCol title="Company" links={['About', 'Resources', 'Terms of Service']} />
      <div>
        <h3 className="text-label-md text-white mb-4 uppercase tracking-wider">Data Source</h3>
        <div className="flex items-center gap-2 text-surface-variant">
          <Icon name="verified" className="text-sm" />
          <span className="text-body-sm">ISO 14001 Certified</span>
        </div>
        <div className="flex items-center gap-2 text-surface-variant mt-2">
          <Icon name="verified" className="text-sm" />
          <span className="text-body-sm">GRI Standard Compliant</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-label-md text-white mb-4 uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-body-sm text-surface-variant hover:text-primary-fixed transition-opacity"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
