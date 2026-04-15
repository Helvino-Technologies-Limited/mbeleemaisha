'use client'
import { useState } from 'react'
import { CheckCircle2, Plus, Trash2, Loader2, User, Phone, Mail, CreditCard, Users, Package, Calendar, UserCheck } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL

const CATEGORIES = [
  { value: 'NUCLEAR',              label: 'Nuclear Family',               desc: 'Principal member, spouse & children' },
  { value: 'NUCLEAR_PARENTS',      label: "Nuclear + Principal's Parents", desc: 'Adds parents of the principal member' },
  { value: 'NUCLEAR_BOTH_PARENTS', label: 'Nuclear + Both Parents',        desc: 'Adds parents of both spouses' },
  { value: 'EXTENDED_FAMILY',      label: 'Extended Family',               desc: 'Nuclear family plus extended relatives (grandparents, aunts, uncles, etc.)' },
]

const PACKAGES = [
  { value: 'MEDICAL',               label: 'Medical Only',                         color: '#0ea5e9', desc: 'Hospital bill coverage up to KSH 100,000' },
  { value: 'LAST_EXPENSE',          label: 'Last Expense Only',                    color: '#ec4899', desc: 'Full funeral support + transport + coffin' },
  { value: 'COMBINED',              label: 'Medical + Last Expense',               color: '#22c55e', desc: 'Complete coverage for your family' },
  { value: 'EDUCATION',             label: 'Child Education Savings',              color: '#f59e0b', desc: 'Monthly savings plan for children Grade 1–4 (KSH 350/child/month)' },
  { value: 'MEDICAL_EDUCATION',     label: 'Medical + Education',                  color: '#8b5cf6', desc: 'Hospital bill coverage combined with child education savings' },
  { value: 'LAST_EDUCATION',        label: 'Last Expense + Education',             color: '#f97316', desc: 'Funeral support combined with child education savings' },
  { value: 'MEDICAL_LAST_EDUCATION',label: 'Medical + Last Expense + Education',   color: '#14b8a6', desc: 'Full triple coverage: medical, funeral support & education savings' },
]

interface Dependant { name: string; relationship: string; dob: string }

const emptyDep = (): Dependant => ({ name: '', relationship: '', dob: '' })

export default function ApplicationForm() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState({
    name: '', phone: '', email: '', idNumber: '',
    category: 'NUCLEAR', package: 'COMBINED',
    registrationDate: '', nextOfKin: '',
  })
  const [deps, setDeps]       = useState<Dependant[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]     = useState('')
  const [done, setDone]       = useState(false)

  const field = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const addDep    = () => setDeps(d => [...d, emptyDep()])
  const removeDep = (i: number) => setDeps(d => d.filter((_, j) => j !== i))
  const updateDep = (i: number, key: keyof Dependant, val: string) =>
    setDeps(d => d.map((dep, j) => j === i ? { ...dep, [key]: val } : dep))

  const step1Valid = form.name && form.phone && form.idNumber && form.registrationDate && form.nextOfKin
  const step2Valid = form.category && form.package

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          dependants: deps.filter(d => d.name),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setDone(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={40} className="text-[#22c55e]" />
        </div>
        <h3 className="text-2xl font-bold text-[#1a1f5e] mb-3">Application Submitted!</h3>
        <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-2">
          Thank you, <span className="font-semibold text-[#1a1f5e]">{form.name}</span>. Your application has been received and is under review.
        </p>
        <p className="text-gray-400 text-sm">
          Our team will contact you on <span className="font-semibold text-[#1a1f5e]">{form.phone}</span> within 1–3 business days to complete the process.
        </p>
        <div className="mt-8 inline-block bg-[#1a1f5e]/5 rounded-2xl px-6 py-4 text-sm text-gray-600">
          <p>Pay registration fee via MPESA:</p>
          <p className="text-[#0ea5e9] font-bold text-2xl mt-1">Paybill 247247</p>
          <p className="text-[#22c55e] font-semibold">Account: 529152</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress bar */}
      <div className="flex border-b border-gray-100">
        {[
          { n: 1, label: 'Personal Details' },
          { n: 2, label: 'Choose Package' },
          { n: 3, label: 'Dependants' },
          { n: 4, label: 'Review & Submit' },
        ].map(({ n, label }) => (
          <div
            key={n}
            className={`flex-1 py-3 text-center text-xs font-semibold transition-colors border-b-2 ${
              step === n
                ? 'border-[#0ea5e9] text-[#0ea5e9] bg-[#0ea5e9]/5'
                : step > n
                ? 'border-[#22c55e] text-[#22c55e] bg-[#22c55e]/5'
                : 'border-transparent text-gray-400'
            }`}
          >
            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-1.5 font-bold ${
              step > n ? 'bg-[#22c55e] text-white' : step === n ? 'bg-[#0ea5e9] text-white' : 'bg-gray-100 text-gray-400'
            }`}>{step > n ? '✓' : n}</span>
            <span className="hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8">

        {/* ── STEP 1: Personal Details ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-[#1a1f5e] text-lg mb-1">Personal Details</h3>
              <p className="text-gray-500 text-sm">Fill in your information exactly as on your National ID.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <User size={13} className="inline mr-1 text-gray-400" />Full Name *
                </label>
                <input
                  required value={form.name} onChange={field('name')}
                  placeholder="e.g. John Otieno Mwangi"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <CreditCard size={13} className="inline mr-1 text-gray-400" />National ID Number *
                </label>
                <input
                  required value={form.idNumber} onChange={field('idNumber')}
                  placeholder="e.g. 12345678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Phone size={13} className="inline mr-1 text-gray-400" />Phone Number *
                </label>
                <input
                  required value={form.phone} onChange={field('phone')}
                  placeholder="e.g. 0712 345 678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Mail size={13} className="inline mr-1 text-gray-400" />Email Address (optional)
                </label>
                <input
                  type="email" value={form.email} onChange={field('email')}
                  placeholder="e.g. john@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Calendar size={13} className="inline mr-1 text-gray-400" />Registration Date *
                </label>
                <input
                  type="date" required value={form.registrationDate} onChange={field('registrationDate')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <UserCheck size={13} className="inline mr-1 text-gray-400" />Next of Kin *
                </label>
                <input
                  required value={form.nextOfKin} onChange={field('nextOfKin')}
                  placeholder="e.g. Jane Otieno"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Package Selection ── */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#1a1f5e] text-lg mb-1">Choose Your Package</h3>
              <p className="text-gray-500 text-sm">Select the family category and welfare package that suits you.</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Users size={14} className="inline mr-1.5 text-gray-400" />Family Category *
              </label>
              <div className="space-y-2.5">
                {CATEGORIES.map(c => (
                  <label key={c.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.category === c.value ? 'border-[#0ea5e9] bg-[#0ea5e9]/5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <input type="radio" name="category" value={c.value}
                      checked={form.category === c.value} onChange={field('category')}
                      className="mt-0.5 accent-[#0ea5e9]" />
                    <div>
                      <p className="font-semibold text-[#1a1f5e] text-sm">{c.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Package */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Package size={14} className="inline mr-1.5 text-gray-400" />Welfare Package *
              </label>
              <div className="space-y-2.5">
                {PACKAGES.map(p => (
                  <label key={p.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.package === p.value ? 'border-2 bg-opacity-5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                    style={form.package === p.value ? { borderColor: p.color, backgroundColor: p.color + '10' } : {}}
                  >
                    <input type="radio" name="package" value={p.value}
                      checked={form.package === p.value} onChange={field('package')}
                      className="mt-0.5" style={{ accentColor: p.color }} />
                    <div>
                      <p className="font-semibold text-[#1a1f5e] text-sm">{p.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-between pt-2">
              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-[#1a1f5e] font-medium">← Back</button>
              <button onClick={() => setStep(3)} disabled={!step2Valid}
                className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 disabled:opacity-40">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Dependants ── */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-[#1a1f5e] text-lg mb-1">Dependants</h3>
              <p className="text-gray-500 text-sm">
                Add your spouse, children, or parents who should be covered under this membership. This step is optional.
              </p>
            </div>

            {deps.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
                <Users size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm mb-4">No dependants added yet</p>
                <button onClick={addDep}
                  className="inline-flex items-center gap-2 bg-[#1a1f5e]/10 text-[#1a1f5e] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a1f5e]/20">
                  <Plus size={16} /> Add Dependant
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {deps.map((d, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#1a1f5e] uppercase tracking-wide">Dependant {i + 1}</span>
                      <button onClick={() => removeDep(i)} className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                        <input value={d.name} onChange={e => updateDep(i, 'name', e.target.value)}
                          placeholder="Full name"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Relationship *</label>
                        <select value={d.relationship} onChange={e => updateDep(i, 'relationship', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
                          <option value="">Select…</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Child">Child</option>
                          <option value="Grandchild">Grandchild</option>
                          <option value="Parent">Parent</option>
                          <option value="Parent-in-law">Parent-in-law</option>
                          <option value="Sibling">Sibling</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                        <input type="date" value={d.dob} onChange={e => updateDep(i, 'dob', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addDep}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-500 hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-colors flex items-center justify-center gap-2">
                  <Plus size={16} /> Add Another Dependant
                </button>
              </div>
            )}

            <div className="flex gap-3 justify-between pt-2">
              <button onClick={() => setStep(2)} className="text-sm text-gray-500 hover:text-[#1a1f5e] font-medium">← Back</button>
              <button onClick={() => setStep(4)}
                className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900">
                Review Application →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Review & Submit ── */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-[#1a1f5e] text-lg mb-1">Review Your Application</h3>
              <p className="text-gray-500 text-sm">Please confirm your details before submitting.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Personal Details</h4>
              <div className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Full Name</span><span className="font-semibold text-[#1a1f5e]">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">ID Number</span><span className="font-semibold text-[#1a1f5e]">{form.idNumber}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-semibold text-[#1a1f5e]">{form.phone}</span></div>
                {form.email && <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold text-[#1a1f5e]">{form.email}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">Registration Date</span><span className="font-semibold text-[#1a1f5e]">{form.registrationDate}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Next of Kin</span><span className="font-semibold text-[#1a1f5e]">{form.nextOfKin}</span></div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Package Selection</h4>
              <div className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-[#1a1f5e]">{CATEGORIES.find(c => c.value === form.category)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Package</span>
                  <span className="font-semibold text-[#1a1f5e]">{PACKAGES.find(p => p.value === form.package)?.label}</span>
                </div>
              </div>
            </div>

            {deps.filter(d => d.name).length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Dependants ({deps.filter(d => d.name).length})</h4>
                <div className="space-y-1.5">
                  {deps.filter(d => d.name).map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-[#0ea5e9] rounded-full shrink-0"></span>
                      <span className="font-semibold text-[#1a1f5e]">{d.name}</span>
                      <span className="text-gray-400">— {d.relationship}</span>
                      {d.dob && <span className="text-gray-400 text-xs">({d.dob})</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}

            <div className="bg-[#1a1f5e]/5 border border-[#1a1f5e]/10 rounded-2xl p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#1a1f5e] mb-1">After submitting:</p>
              <p>Pay KSH 200 registration fee via MPESA Paybill <span className="font-bold text-[#0ea5e9]">247247</span>, Account <span className="font-bold text-[#22c55e]">529152</span>. Our team will review your application and activate your membership within 1–3 business days.</p>
            </div>

            <div className="flex gap-3 justify-between pt-2">
              <button onClick={() => setStep(3)} className="text-sm text-gray-500 hover:text-[#1a1f5e] font-medium">← Back</button>
              <button onClick={submit} disabled={submitting}
                className="btn-primary !bg-[#22c55e] hover:!bg-green-600 disabled:opacity-60 !px-8">
                {submitting
                  ? <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                  : '✓ Submit Application'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
