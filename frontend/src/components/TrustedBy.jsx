const LOGOS = ['ECO-LOGISTICS', 'GREEN-FIN', 'TERRA-CORP', 'VITALITY', 'OASIS-MGMT']

export default function TrustedBy() {
  return (
    <section className="py-12 bg-white border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        <p className="text-center text-label-md text-on-surface-variant/60 uppercase tracking-[0.2em] mb-8">
          Empowering Forward-Thinking Organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {LOGOS.map((logo) => (
            <span key={logo} className="text-headline-sm font-bold">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
