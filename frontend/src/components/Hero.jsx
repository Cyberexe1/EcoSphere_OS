import Icon from './Icon.jsx'

const AVATARS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8bESyqtS2hIZSlteEFeQ0RosPsVckGopFApqU9Hx03oP2TV0AG86wROAFBhYadIKMu9BeZ7kTRbM8aYAdSXnrmaG6ftx1xQK1aToaJstwj597aq1zYVEOh_W__JuNg0Cpb8QTVn8jfO0tBMHKs5d6hAtj8iAuGO5swKIo1ZQ7rbIfJ2M9ZxJCI_AQT9VE9OYEgPO6ab8hA4LY34H_9hsYatU3atbyMCycG4XwBCRBV-IyMDgBkNKvst9rHJbylFRCte2HcsaR6y2b',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCH7TD2vzkAbZbcRul9s_YqODWcQ0blg9pvEf3yVlxEblspGU_FSD8yGEuXpBpzUAxhS0YqjLy5LPL0NhCY-yuQ-6OaV5Y_vcB3uIbRT0zhds0kFC2XImiySUK0xjcwsXCBZzHtkBc92P4JqvvpiNyK_rWFd8zwGENwfJCkPhRxC_o-AaZf0nx4l3MvIaXP-PiTQAoEFTXhuP8YjKAD5Co09ZqPwC8bda91uy5T1q9NmD5uLP4dtzXaJkHFmy2eshg0KA_MI9AxCF_c',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDM6GrEIrsdhZd-oBoUtHmwHsdzKqfBXnGVIkDGM46Du5SKEGeRDcKXxD6hMaN5yoIsiPHFMCMc0Y71lK0yzFBYAeY3Ws-x2ZXLV8TfHz9nAl7mdA5HVeCcod9iYj6P8SJ88KZPiGFSjv591zVfyPTMcqQqm4FhEWsWkyVBZAIhN-g45V-aNt8hrmir4e0PNeh1x443Bk1fqfWIN9mJyqyBKQ-3DsgOAPjqovFb0vjRTUI4MRg5PpIurnqBT00CZoCouj2skMmI6xpz',
]

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBKNyxEFQDiuCxDk7DTjIkF8a2rrwqXOAk7nZS0nxuRiRjT616tJZRbi4lFB9f2xpolJIuYt2KHJuKSkjD_dkKERfEZ5OzHQ_VnZneTqlerVZTQh1ANtFTi6R00uIcnvYsyIsOQNCYrPFHbGHPxYBGl8hAy3kK2vAzT-PmX58TVDECdgqdR95fD5SLPeuYl1IWa7ifd7oyAQmpb2lxIPq-OD2LCf8AD2ei4zUmIP_2f-8tMq5HyHqvUBe5j2hEycrS3e1_ePIYUW-dJ'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28 bg-surface">
      <div className="max-w-[1440px] mx-auto px-container-padding grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/20 text-on-primary-container rounded-full border border-primary-container/30">
            <Icon name="verified" className="text-[18px]" />
            <span className="text-label-sm">NEXT-GEN ESG MANAGEMENT</span>
          </div>
          <h1 className="text-[40px] md:text-[56px] leading-[1.1] font-extrabold text-on-surface tracking-tight">
            Manage your entire <span className="text-primary">ESG program</span> in one place.
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl">
            A surgical approach to sustainability data. Streamline reporting, track emissions in
            real-time, and drive environmental impact with the industry's most advanced ESG
            platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-on-primary text-label-md px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primary-container transition-all shadow-xl">
              Start Free Trial
              <Icon name="arrow_forward" />
            </button>
            <button className="border border-outline-variant text-label-md text-on-surface px-8 py-4 rounded-full hover:bg-surface-variant/30 transition-all">
              Book a Demo
            </button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {AVATARS.map((src, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-surface bg-slate-200 bg-cover bg-center"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Trusted by <span className="font-bold text-on-surface">2,500+</span> enterprises
              globally
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="bg-white rounded-xl border border-outline-variant eco-shadow overflow-hidden p-2 transform rotate-1 hover:rotate-0 transition-transform duration-700">
            <div className="bg-surface-container rounded-lg aspect-[16/10] relative">
              <img
                className="w-full h-full object-cover rounded-lg"
                alt="EcoSphere ESG dashboard showing carbon trends and sustainability metrics"
                src={HERO_IMAGE}
              />
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white border border-outline-variant p-6 rounded-xl eco-shadow hidden md:block max-w-[240px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-label-md text-on-surface-variant">Net Zero Goal</span>
              <span className="text-primary font-bold">84%</span>
            </div>
            <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[84%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
