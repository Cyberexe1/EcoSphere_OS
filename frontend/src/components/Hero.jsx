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
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-32 bg-surface">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-container/20 text-on-primary-container rounded-full border border-primary-container/30 animate-pulse">
            <Icon name="verified" className="text-[16px] sm:text-[18px]" />
            <span className="text-[11px] sm:text-label-sm font-medium">NEXT-GEN ESG MANAGEMENT</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-extrabold text-on-surface tracking-tight">
            Manage your entire <span className="text-primary relative">ESG program
              <svg className="absolute -bottom-2 left-0 w-full hidden sm:block" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
              </svg>
            </span> in one place.
          </h1>
          <p className="text-body-md sm:text-body-lg text-on-surface-variant max-w-xl">
            A surgical approach to sustainability data. Streamline reporting, track emissions in
            real-time, and drive environmental impact with the industry's most advanced ESG
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-primary text-on-primary text-label-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300">
              Start Free Trial
              <Icon name="arrow_forward" />
            </button>
            <button className="border border-outline-variant text-label-md text-on-surface px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-surface-variant/30 hover:border-primary/30 transition-all duration-300">
              Book a Demo
            </button>
          </div>
          <div className="flex items-center gap-4 pt-2 sm:pt-4">
            <div className="flex -space-x-3">
              {AVATARS.map((src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-surface bg-slate-200 bg-cover bg-center ring-2 ring-white"
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

        <div className="relative z-10 mt-8 lg:mt-0">
          <div className="bg-white rounded-2xl border border-outline-variant/60 shadow-2xl shadow-black/5 overflow-hidden p-2 sm:p-3 transform rotate-1 hover:rotate-0 transition-transform duration-700">
            <div className="bg-surface-container rounded-xl aspect-[16/10] relative overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-xl"
                alt="EcoSphere ESG dashboard showing carbon trends and sustainability metrics"
                src={HERO_IMAGE}
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-white border border-outline-variant/60 p-4 sm:p-6 rounded-xl shadow-xl shadow-black/5 hidden sm:block max-w-[220px] sm:max-w-[240px]">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-label-sm sm:text-label-md text-on-surface-variant">Net Zero Goal</span>
              <span className="text-primary font-bold text-sm sm:text-base">84%</span>
            </div>
            <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary/80 to-primary w-[84%] rounded-full" />
            </div>
          </div>
          {/* Floating badge top-right */}
          <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 bg-white border border-outline-variant/60 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-lg hidden md:flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-label-sm text-on-surface-variant">Live Tracking</span>
          </div>
        </div>
      </div>
    </section>
  )
}
