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
    <section className="py-24 bg-white" id="features">
      <div className="max-w-[1440px] mx-auto px-container-padding flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-display-lg font-bold text-on-surface tracking-tight">
            Real-time Emissions Intelligence
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Stop waiting for annual audits. EcoSphere provides live tracking of your carbon
            footprint across all global locations. Our AI identifies anomalies and suggests
            immediate mitigation strategies.
          </p>
          <ul className="space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Icon name="check_circle" className="text-primary" />
                <span className="text-body-md text-on-surface">{f}</span>
              </li>
            ))}
          </ul>
          <button className="text-label-md text-primary font-bold flex items-center gap-2 group">
            Learn more about Data Transparency
            <Icon name="arrow_right_alt" className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant relative overflow-hidden h-[400px]">
            <div className="absolute inset-x-8 top-12 bottom-12 flex items-end justify-between">
              <div className="w-full h-full relative overflow-hidden rounded-lg bg-white/50 border border-white/20 p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-label-sm text-on-surface-variant">
                      Carbon Emissions (tCO2e)
                    </p>
                    <p className="text-headline-md font-bold text-primary">
                      -12.4%{' '}
                      <span className="text-body-sm font-normal text-on-surface-variant">
                        vs LY
                      </span>
                    </p>
                  </div>
                  <Icon name="trending_down" className="text-primary" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 h-32 flex items-end gap-1">
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${BAR_OPACITY[i]} ${h} rounded-t-sm transition-all`}
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
