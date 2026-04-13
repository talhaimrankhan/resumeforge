import Navbar from '../components/common/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import TemplatePreviews from '../components/landing/TemplatePreviews'
import CTA from '../components/landing/CTA'
import FAQ from '../components/landing/FAQ'
import Footer from '../components/common/Footer'
import SEO from '../components/seo/SEO'

export default function LandingPage() {
  return (
    <>
      <SEO canonical="/" />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <TemplatePreviews />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
