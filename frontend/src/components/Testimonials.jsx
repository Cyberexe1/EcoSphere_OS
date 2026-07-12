const AUTHOR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDFUYOSkYv06085IXDV-wFFcMLx2rfND-VNkTFbuFo4qkS_ZBY2n8-gQ50ZrYvqoVcEe55DtpB7ZLB7G6On5jotiw8VL_2nAnkr7hMHF_VrW6Zwgj_YgPT4y3UPBgi0fu6EiLF9vn3UamTMOYep0E6tNl3-rsSvxKLHvHBoWpitSDcFmXaq24bBj56Cj-AOtrDpEK9NeCrAyPv428Sz5YBzOkFIeq02c0KHPkFfnGjXZJAcHMnnNIC4HV8fQmdazWKJYAyrLMjLNjJo'

const STATS = [
  { value: '98% Accuracy', desc: 'In automated carbon footprint audits.', pad: true },
  { value: '500+ Frameworks', desc: 'Supported globally including EU taxonomy.', pad: true },
  { value: '24/7 Monitoring', desc: 'Live alerts for compliance deviations.', pad: false },
  { value: 'API-First', desc: 'Integrates with SAP, Oracle, and Salesforce.', pad: false },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-primary font-bold text-label-md tracking-widest uppercase">
              Success Stories
            </span>
            <h2 className="text-display-lg font-bold">What Industry Leaders Are Saying</h2>
            <div className="p-8 bg-surface-container rounded-2xl border border-outline-variant">
              <p className="text-body-lg italic mb-6">
                "EcoSphere transformed our ESG department from a 'check-the-box' function into a
                strategic data powerhouse. We've reduced reporting time by 70% while improving
                accuracy across all three pillars."
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${AUTHOR_IMG}')` }}
                />
                <div>
                  <p className="font-bold text-on-surface">Sarah Jenkins</p>
                  <p className="text-label-sm text-on-surface-variant">
                    CSO, Global Manufacturing Group
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              {STATS.filter((s) => s.pad).map((s) => (
                <StatCard key={s.value} {...s} />
              ))}
            </div>
            <div className="space-y-4">
              {STATS.filter((s) => !s.pad).map((s) => (
                <StatCard key={s.value} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, desc }) {
  return (
    <div className="p-6 bg-white border border-outline-variant rounded-xl eco-shadow">
      <p className="text-body-md font-bold text-primary mb-2">{value}</p>
      <p className="text-body-sm text-on-surface-variant">{desc}</p>
    </div>
  )
}
