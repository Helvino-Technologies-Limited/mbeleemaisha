import Link from 'next/link'
import { ArrowRight, Shield, Heart, BookOpen } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-[#1a1f5e] min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/20 border border-[#0ea5e9]/30 text-[#0ea5e9] px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse"></span>
            Registered Welfare Organization · Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Protecting Families,{' '}
            <span className="text-[#0ea5e9]">Preserving</span>{' '}
            <span className="text-[#ec4899]">Dignity</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
            Mbelee Maisha supports members through medical emergencies, last expense coverage,
            and children's education savings — ensuring every family faces unforeseen events
            with strength and dignity.
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
              Become a Member <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn-outline">
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
