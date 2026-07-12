import Icon from './Icon.jsx'

const FEATURES = [
  'Automated API data ingestion from energy providers',
  'Global heatmaps for supply chain risk assessment',
  'Scenario modeling for Net-Zero pathways',
]

const BARS = [
  'h-[60%]',
  'h-[55%]',
  'h-[70%]',
  'h-[65%]',
  'h-[50%]',
  'h-[45%]',
  'h-[30%]',
  'h-[25%]',
]
const BAR_OPACITY = [
  'bg-primary/20',
  'bg-primary/20',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/80',
  'bg-primary',
]

export default function FeatureHighlight() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="features">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-container-padding flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full border border-primary/10">
            <Icon name="insights" className="text-[16px]" />
            <span className="text-[11px] sm:text-label-sm font-medium uppercase tracking-wider">Real-time Analytics</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-display-lg font-bold text-on-surface tracking-tight">
            Real-time Emissions Intelligence
          </h2>
          <p className="text-body-md sm:text-body-lg text-on-surface-variant">
            Stop waiting for annual audits. EcoSphere provides live tracking of your carbon
            footprint across all global locations. Our AI identifies anomalies and suggests
            immediate mitigation strategies.
          </p>
          <ul className="space-y-3 sm:space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start sm:items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                  <Icon name="check" className="text-primary text-[14px]" />
                </div>
                <span className="text-body-sm sm:text-body-md text-on-surface">{f}</span>
              </li>
            ))}
          </ul>
          <button className="text-label-md text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all pt-2">
            Learn more about Data Transparency
            <Icon name="arrow_right_alt" className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="bg-gradient-to-br from-surface-container to-surface-container-low rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-outline-variant/60 relative overflow-hidden h-[300px] sm:h-[360px] lg:h-[400px] shadow-lg shadow-black/5">
            <div className="absolute inset-x-6 sm:inset-x-8 top-10 sm:top-12 bottom-10 sm:bottom-12 flex items-end justify-between">
              <div className="w-full h-full relative overflow-hidden rounded-xl bg-white/70 backdrop-blur-sm border border-white/40 p-4 sm:p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[11px] sm:text-label-sm text-on-surface-variant">
                      Carbon Emissions (tCO2e)
                    </p>
                    <p className="text-headline-sm sm:text-headline-md font-bold text-primary">
                      -12.4%{' '}
                      <span className="text-[11px] sm:text-body-sm font-normal text-on-surface-variant">
                        vs LY
                      </span>
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="trending_down" className="text-green-600 text-[18px] sm:text-[22px]" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-24 sm:h-32 flex items-end gap-1 sm:gap-1.5">
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${BAR_OPACITY[i]} ${h} rounded-t-sm sm:rounded-t transition-all hover:opacity-80`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
