import Link from 'next/link'
import { Stethoscope, HeartHandshake, GraduationCap, BookOpen, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Stethoscope, color: '#0ea5e9', number: '01', title: 'Medical Package',
    desc: 'Covers hospital bills when a member is admitted in public and mission hospitals.',
    bullets: ['KSH 100,000 for principal member','KSH 50,000 per dependant annually'],
  },
  {
    icon: HeartHandshake, color: '#ec4899', number: '02', title: 'Last Expense Package',
    desc: 'Compassionate support for members in case of loss of a family member.',
    bullets: ['KSH 50,000 cash funeral support','Burial coffin provided','2 weeks mortuary covered','Transport + tents + chairs'],
  },
  {
    icon: GraduationCap, color: '#22c55e', number: '03', title: 'Child Education Savings',
    desc: "A savings plan to help members secure their children's future school fees for Grade 1–4.",
    bullets: ['Targets Grade 1 – Grade 4','Monthly contribution: KSH 350/child'],
  },
  {
    icon: BookOpen, color: '#f59e0b', number: '04', title: 'Education Package',
    desc: 'Dedicated education support to ensure your children never miss school due to lack of fees.',
    bullets: ['Voluntary and flexible plan','KSH 350/month per child','Apply and enrol online'],
  },
]

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-[#1a1f5e]/10 text-[#1a1f5e] px-4 py-1 rounded-full text-sm font-semibold mb-4">Our Services</span>
          <h2 className="section-title mb-4">Four Packages, One Goal</h2>
          <p className="text-gray-500">Comprehensive welfare solutions to protect every aspect of your family's wellbeing.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map(({ icon: Icon, color, number, title, desc, bullets }) => (
            <div key={title} className="card p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <span className="text-4xl font-bold opacity-10" style={{ color }}>{number}</span>
              </div>
              <h3 className="font-bold text-xl text-[#1a1f5e] mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
              <ul className="space-y-2">
                {bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }}></span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900">
            View Full Details <ArrowRight size={16} />
          </Link>
          <Link href="/membership#apply" className="btn-primary !bg-[#22c55e] hover:!bg-green-600">
            Apply Online <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
