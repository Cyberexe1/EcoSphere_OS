import Icon from './Icon.jsx'

export default function CTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-container-padding">
      <div className="max-w-[1440px] mx-auto bg-inverse-surface rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-6 sm:px-8 text-center text-white space-y-5 sm:space-y-6 lg:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[11px] sm:text-label-sm text-white/80">Join 2,500+ companies</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-extrabold max-w-3xl mx-auto tracking-tight leading-tight">
            Ready to lead the sustainable transition?
          </h2>
          <p className="text-body-md sm:text-body-lg text-surface-variant max-w-xl mx-auto">
            Join the world's most transparent companies. Get your first module up and running in
            under 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
            <button className="bg-primary text-on-primary px-8 sm:px-10 py-4 sm:py-5 rounded-full text-label-md hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
              Get Started for Free
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
            <button className="border border-white/20 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-label-md hover:bg-white/10 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
