import Icon from './Icon.jsx'

const AUTHOR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDFUYOSkYv06085IXDV-wFFcMLx2rfND-VNkTFbuFo4qkS_ZBY2n8-gQ50ZrYvqoVcEe55DtpB7ZLB7G6On5jotiw8VL_2nAnkr7hMHF_VrW6Zwgj_YgPT4y3UPBgi0fu6EiLF9vn3UamTMOYep0E6tNl3-rsSvxKLHvHBoWpitSDcFmXaq24bBj56Cj-AOtrDpEK9NeCrAyPv428Sz5YBzOkFIeq02c0KHPkFfnGjXZJAcHMnnNIC4HV8fQmdazWKJYAyrLMjLNjJo'

const STATS = [
  { value: '98% Accuracy', desc: 'In automated carbon footprint audits.', icon: 'verified' },
  { value: '500+ Frameworks', desc: 'Supported globally including EU taxonomy.', icon: 'language' },
  { value: '24/7 Monitoring', desc: 'Live alerts for compliance deviations.', icon: 'notifications_active' },
  { value: 'API-First', desc: 'Integrates with SAP, Oracle, and Salesforce.', icon: 'api' },
]

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-5 sm:space-y-6">
            <span className="text-primary font-bold text-label-md tracking-widest uppercase">
              Success Stories
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-display-lg font-bold">
              What Industry Leaders Are Saying
            </h2>
            <div className="p-6 sm:p-8 bg-surface-container rounded-2xl border border-outline-variant relative">
              <Icon name="format_quote" className="absolute top-4 left-4 sm:top-6 sm:left-6 text-primary/10 text-[40px] sm:text-[48px]" />
              <p className="text-body-md sm:text-body-lg italic mb-5 sm:mb-6 relative z-10 pt-4 sm:pt-2">
                "EcoSphere transformed our ESG department from a 'check-the-box' function into a
                strategic data powerhouse. We've reduced reporting time by 70% while improving
                accuracy across all three pillars."
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cover bg-center ring-2 ring-primary/20"
                  style={{ backgroundImage: `url('${AUTHOR_IMG}')` }}
                />
                <div>
                  <p className="font-bold text-on-surface text-body-sm sm:text-body-md">Sarah Jenkins</p>
                  <p className="text-[11px] sm:text-label-sm text-on-surface-variant">
                    CSO, Global Manufacturing Group
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className={`p-4 sm:p-6 bg-white border border-outline-variant rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 ${i % 2 === 0 ? 'sm:translate-y-6' : ''}`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name={s.icon} className="text-primary text-[16px] sm:text-[20px]" />
                </div>
                <p className="text-body-sm sm:text-body-md font-bold text-primary mb-1">{s.value}</p>
                <p className="text-[11px] sm:text-body-sm text-on-surface-variant">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
