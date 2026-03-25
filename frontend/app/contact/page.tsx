import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { getSiteContent } from '@/lib/content'
import ContactForm from './ContactForm'

export const metadata = { title: 'Contact | Mbelee Maisha' }

export default async function ContactPage() {
  const c = await getSiteContent()

  const contactItems = [
    { icon: Phone,  title: 'Phone',         value: c.phone,   href: `tel:${c.phone.replace(/\D/g,'')}` },
    { icon: Mail,   title: 'Email',         value: c.email,   href: `mailto:${c.email}` },
    { icon: MapPin, title: 'Address',       value: c.address, href: null },
    { icon: Clock,  title: 'Working Hours', value: c.hours,   href: null },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#1a1f5e] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-white/70 text-lg">We are here to help. Reach out to us any time.</p>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                {contactItems.map(({ icon: Icon, title, value, href }) => (
                  <div key={title} className="card p-6 flex items-start gap-5">
                    <div className="w-12 h-12 bg-[#1a1f5e] rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1f5e] mb-1">{title}</p>
                      {href
                        ? <a href={href} className="text-[#0ea5e9] hover:underline text-sm">{value}</a>
                        : <p className="text-gray-600 text-sm whitespace-pre-line">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-8">
                <h2 className="section-title text-2xl mb-6">Send a Message</h2>
                <ContactForm />
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
