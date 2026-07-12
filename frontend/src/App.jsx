import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustedBy from './components/TrustedBy.jsx'
import Modules from './components/Modules.jsx'
import FeatureHighlight from './components/FeatureHighlight.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Testimonials from './components/Testimonials.jsx'
import Pricing from './components/Pricing.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="bg-background selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      <main className="pt-24">
        <Hero />
        <TrustedBy />
        <Modules />
        <FeatureHighlight />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
