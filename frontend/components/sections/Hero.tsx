import Link from 'next/link'
import { ArrowRight, Shield, Heart, BookOpen } from 'lucide-react'
import { getSiteContent } from '@/lib/content'

export default async function Hero() {
  const c = await getSiteContent()

  return (
    <section className="bg-[#1a1f5e] min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/20 border border-[#0ea5e9]/30 text-[#0ea5e9] px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></span>
              Registered Welfare Organization · Kenya
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {c.hero_title}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              {c.hero_subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { Icon: Shield,   label: 'Medical Coverage',  color: 'text-[#0ea5e9]' },
                { Icon: Heart,    label: 'Last Expense',      color: 'text-[#ec4899]' },
                { Icon: BookOpen, label: 'Education Savings', color: 'text-[#22c55e]' },
              ].map(({ Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full">
                  <Icon size={16} className={color} />
                  <span className="text-white text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/membership" className="btn-primary">
                {c.cta_text} <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-outline">
                View Our Services
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-48">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80&auto=format&fit=crop"
                  alt="Happy Mbelee Maisha members"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-36">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80&auto=format&fit=crop"
                  alt="Medical welfare coverage Kenya"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-2xl overflow-hidden h-36">
                <img
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop"
                  alt="Children education savings plan Kenya"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-48">
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop"
                  alt="Satisfied welfare organization member"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
