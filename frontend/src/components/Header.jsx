import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
  { label: 'About', href: '#about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-3 md:top-4 left-0 w-full z-50 px-4 md:px-container-padding">
      <div
        className={`flex justify-between items-center h-16 max-w-[1200px] mx-auto pl-6 pr-4 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-outline-variant/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
            : 'bg-white/70 backdrop-blur-md border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="flex items-center gap-8">
          <span className="text-headline-md font-extrabold text-primary tracking-tight">
            EcoSphere
          </span>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                className="text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-label-md text-primary px-4 py-2 hover:bg-surface-variant/50 transition-colors rounded-lg">
            Log in
          </button>
          <button className="text-label-md bg-primary text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all active:scale-95">
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-on-surface p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden max-w-[1200px] mx-auto mt-3 bg-white/90 backdrop-blur-md border border-outline-variant/40 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              className="text-body-lg text-on-surface-variant hover:text-primary transition-colors"
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/30">
            <button className="text-label-md text-primary px-4 py-2 rounded-lg border border-outline-variant">
              Log in
            </button>
            <button className="text-label-md bg-primary text-white px-6 py-3 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
