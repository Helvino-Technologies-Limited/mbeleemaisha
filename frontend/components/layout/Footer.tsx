import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1f5e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-full p-1">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-lg">Mbelee Maisha</p>
                <p className="text-[#0ea5e9] text-xs">Welfare Organization</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Supporting members and families through medical, funeral, and education welfare across Kenya.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/40 mb-1">MPESA Paybill</p>
              <p className="font-bold text-[#0ea5e9] text-xl">247247</p>
              <p className="text-xs text-white/40 mt-1">Account: 529152</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-5 text-[#0ea5e9]">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'],['/about','About Us'],['/services','Services'],
                ['/membership','Membership'],['/contributions','Packages'],['/contact','Contact']
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-white text-sm transition-colors">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-5 text-[#0ea5e9]">Our Packages</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#0ea5e9] rounded-full"></span>Medical Package</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#ec4899] rounded-full"></span>Last Expense Package</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>Child Education Savings</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-5 text-[#0ea5e9]">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="text-[#0ea5e9] shrink-0" />
                <a href="tel:0140166773" className="hover:text-white transition-colors">0140-166773</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="text-[#0ea5e9] shrink-0" />
                <a href="mailto:info@mbeleemaisha.com" className="hover:text-white transition-colors">info@mbeleemaisha.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={14} className="text-[#0ea5e9] mt-0.5 shrink-0" />
                <span>P.O Box 68 Siaya, Awello Junction, Siaya Kadenge Road</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Clock size={14} className="text-[#0ea5e9] mt-0.5 shrink-0" />
                <span>Mon–Fri: 8:00AM – 5:00PM<br /><span className="text-white/40">Weekends: On call</span></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Mbelee Maisha Welfare Organization. All rights reserved.</p>
          <p className="text-white/30 text-xs">Developed by <a href="https://helvino.org" className="text-[#0ea5e9] hover:underline">Helvino Technologies Limited</a></p>
        </div>
      </div>
    </footer>
  )
}
