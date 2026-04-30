import Nav from './layout/Nav'
import Footer from './layout/Footer'
import Hero from './sections/Hero'
import Trust from './sections/Trust'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
import Features from './sections/Features'
import HowItWorks from './sections/HowItWorks'
import UseCases from './sections/UseCases'
import Architecture from './sections/Architecture'
import Benefits from './sections/Benefits'
import Showcase from './sections/Showcase'
import CTA from './sections/CTA'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <Trust />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <Showcase />
        <UseCases />
        <Architecture />
        <Benefits />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
