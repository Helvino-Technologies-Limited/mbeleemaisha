export default function ContributionsTable() {
  const rows = [
    { category: 'Nuclear Family', medical: 350, last: 350, combined: 700 },
    { category: 'Nuclear Family + Parents of Principal Member', medical: 550, last: 550, combined: 1100 },
    { category: 'Nuclear Family + Parents of Both Principal & Spouse', medical: 750, last: 750, combined: 1500 },
  ]
  return (
    <section className="py-24 bg-[#1a1f5e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Monthly Contributions</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Affordable Plans for Every Family</h2>
          <p className="text-white/60">All amounts in Kenyan Shillings (KSH)</p>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-2xl">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-[#0ea5e9] text-white text-sm">
                <th className="text-left px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-center">Medical</th>
                <th className="px-6 py-4 font-semibold text-center">Last Expense</th>
                <th className="px-6 py-4 font-semibold text-center bg-[#ec4899]/80">Medical + Last Expense</th>
                <th className="px-6 py-4 font-semibold text-center">Max Annual Cover</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
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
      </div>
    </section>
  )
}
