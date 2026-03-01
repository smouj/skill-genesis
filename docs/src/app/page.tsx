import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import SkillsGallery from '@/components/SkillsGallery'
import InteractiveDemo from '@/components/InteractiveDemo'
import Testimonials from '@/components/Testimonials'
import QuickStart from '@/components/QuickStart'
import Roadmap from '@/components/Roadmap'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SkillsGallery />
      <InteractiveDemo />
      <Testimonials />
      <QuickStart />
      <Roadmap />
      <Footer />
    </main>
  )
}
