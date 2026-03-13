import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = { title: 'Packages & Contributions | Mbelee Maisha' }

export default function ContributionsPage() {
  const rows = [
    { category: 'Nuclear Family', medical: 350, last: 350, combined: 700 },
    { category: 'Nuclear Family + Parents of Principal Member', medical: 550, last: 550, combined: 1100 },
    { category: 'Nuclear Family + Parents of Both Principal & Spouse', medical: 750, last: 750, combined: 1500 },
  ]
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#1a1f5e] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Packages</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contribution Rates</h1>
            <p className="text-white/70 text-lg">Monthly contributions for Medical and Last Expense packages.</p>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-[#1a1f5e] text-white text-sm">
                    <th className="text-left px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold text-center">Medical (KSH)</th>
                    <th className="px-6 py-4 font-semibold text-center">Last Expense (KSH)</th>
                    <th className="px-6 py-4 font-semibold text-center bg-[#ec4899]/70">Combined (KSH)</th>
                    <th className="px-6 py-4 font-semibold text-center">Max Cover</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-6 py-5 text-sm font-medium text-[#1a1f5e]">{row.category}</td>
                      <td className="px-6 py-5 text-center text-sm text-[#0ea5e9] font-semibold">{row.medical}</td>
                      <td className="px-6 py-5 text-center text-sm text-[#0ea5e9] font-semibold">{row.last}</td>
                      <td className="px-6 py-5 text-center text-sm font-bold text-[#ec4899] bg-pink-50">{row.combined}</td>
                      <td className="px-6 py-5 text-center text-sm font-bold text-[#22c55e]">KSH 100,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-400 text-xs mt-6">All amounts in Kenyan Shillings. Subject to terms and conditions.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
