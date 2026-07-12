import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const HIGHLIGHTS = [
  { icon: 'insights', text: 'Real-time emissions intelligence across all locations' },
  { icon: 'verified', text: 'BRSR, GRI & SASB compliant one-click reporting' },
  { icon: 'lock', text: 'Enterprise-grade security and data transparency' },
]

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0F3D2E] via-[#0b4a35] to-[#13543E] text-white flex-col justify-between p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl" />

        <Link to="/" className="relative z-10 flex items-center gap-2 w-fit">
          <span className="text-headline-md font-extrabold tracking-tight text-white">
            EcoSphere
          </span>
        </Link>

        <div className="relative z-10 space-y-8 max-w-md">
          <h2 className="text-[36px] leading-[1.15] font-extrabold tracking-tight">
            Data Transparency for a Greener Future.
          </h2>
          <ul className="space-y-5">
            {HIGHLIGHTS.map((h) => (
              <li key={h.text} className="flex items-start gap-3">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon name={h.icon} className="text-primary-fixed-dim text-[20px]" />
                </span>
                <span className="text-body-md text-white/85 pt-1.5">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-body-sm text-white/60">
          Trusted by 2,500+ enterprises globally.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 mb-8 text-primary font-extrabold text-headline-md"
          >
            EcoSphere
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
