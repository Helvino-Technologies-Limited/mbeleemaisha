import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Target, Eye, Heart, Users } from 'lucide-react'
import { getSiteContent } from '@/lib/content'

export const metadata = { title: 'About Us | Mbelee Maisha' }

export default async function AboutPage() {
  const c = await getSiteContent()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#1a1f5e] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Who We Are</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">A registered welfare organization dedicated to supporting Kenyan families.</p>
          </div>
        </section>
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="section-title mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">{c.story}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: Target, color: 'text-[#ec4899]', bg: 'bg-pink-50',   title: 'Our Mission', desc: c.mission },
                  { icon: Eye,    color: 'text-[#0ea5e9]', bg: 'bg-blue-50',   title: 'Our Vision',  desc: c.vision },
                  { icon: Users,  color: 'text-[#22c55e]', bg: 'bg-green-50',  title: 'Our People',  desc: 'Highly qualified, skilled, friendly, and experienced staff committed to serving every member with care.' },
                  { icon: Heart,  color: 'text-[#1a1f5e]', bg: 'bg-indigo-50', title: 'Our Values',  desc: 'Integrity, confidentiality, compassion, and timely service delivery guide everything we do.' },
                ].map(({ icon: Icon, color, bg, title, desc }) => (
                  <div key={title} className="card p-5">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={18} className={color} />
                    </div>
                    <h3 className="font-bold text-[#1a1f5e] mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
