import Icon from '../Icon.jsx'

export default function DashboardFooter() {
  return (
    <footer className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-[#1a2e23] border-t border-black/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="sm:col-span-2 md:col-span-1">
          <h2 className="text-lg font-bold text-white mb-2">EcoSphere</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            © 2024 EcoSphere ESG Management. Data Transparency for a Greener Future.
          </p>
        </div>
        <FooterCol title="Product" links={['Features', 'Modules', 'Pricing']} />
        <FooterCol title="Company" links={['About', 'Resources', 'Terms of Service']} />
        <div>
          <h3 className="text-xs text-white font-semibold mb-3 uppercase tracking-wider">Certifications</h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-white/50">
              <Icon name="verified" className="text-[16px] text-primary" />
              <span className="text-sm">ISO 14001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <Icon name="verified" className="text-[16px] text-primary" />
              <span className="text-sm">GRI Standard Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-xs text-white font-semibold mb-3 uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
