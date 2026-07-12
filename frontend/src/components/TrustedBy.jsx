const LOGOS = ['ECO-LOGISTICS', 'GREEN-FIN', 'TERRA-CORP', 'VITALITY', 'OASIS-MGMT']

export default function TrustedBy() {
  return (
    <section className="py-8 sm:py-12 bg-white border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding">
        <p className="text-center text-[11px] sm:text-label-md text-on-surface-variant/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8">
          Empowering Forward-Thinking Organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-70 transition-all duration-500">
          {LOGOS.map((logo) => (
            <span key={logo} className="text-body-md sm:text-headline-sm font-bold whitespace-nowrap">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
