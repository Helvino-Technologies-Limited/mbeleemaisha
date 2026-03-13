import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import AboutPreview from '@/components/sections/AboutPreview'
import ServicesPreview from '@/components/sections/ServicesPreview'
import ContributionsTable from '@/components/sections/ContributionsTable'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import MembershipCTA from '@/components/sections/MembershipCTA'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <AboutPreview />
        <ServicesPreview />
        <ContributionsTable />
        <WhyChooseUs />
        <MembershipCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
