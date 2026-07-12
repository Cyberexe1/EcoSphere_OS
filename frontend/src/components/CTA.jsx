export default function CTA() {
  return (
    <section className="py-20 px-container-padding">
      <div className="max-w-[1440px] mx-auto bg-inverse-surface rounded-[40px] overflow-hidden relative">
        <div className="relative z-10 py-20 px-8 text-center text-white space-y-8">
          <h2 className="text-[36px] md:text-[48px] font-extrabold max-w-3xl mx-auto tracking-tight">
            Ready to lead the sustainable transition?
          </h2>
          <p className="text-body-lg text-surface-variant max-w-xl mx-auto">
            Join the world's most transparent companies. Get your first module up and running in
            under 24 hours.
          </p>
          <div className="flex justify-center gap-6">
            <button className="bg-primary text-on-primary px-10 py-5 rounded-full text-label-md hover:scale-105 transition-transform">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
