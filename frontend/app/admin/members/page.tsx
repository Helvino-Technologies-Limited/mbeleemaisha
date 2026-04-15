'use client'
import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  X, Plus, Loader2, CheckCircle2, Users, Search,
  ChevronDown, ChevronUp, Phone, Mail, CreditCard,
  Calendar, Package, UserCheck, UserX, Clock, Trash2,
} from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('adminToken') : ''
}

const PKG_LABEL: Record<string, string> = {
  MEDICAL:                'Medical Only',
  LAST_EXPENSE:           'Last Expense',
  COMBINED:               'Medical + Last Expense',
  EDUCATION:              'Child Education Savings',
  MEDICAL_EDUCATION:      'Medical + Education',
  LAST_EDUCATION:         'Last Expense + Education',
  MEDICAL_LAST_EDUCATION: 'Medical + Last Expense + Education',
}
const CAT_LABEL: Record<string, string> = {
  NUCLEAR:               'Nuclear Family',
  NUCLEAR_PARENTS:       "Nuclear + Principal's Parents",
  NUCLEAR_BOTH_PARENTS:  'Nuclear + Both Parents',
  EXTENDED_FAMILY:       'Extended Family',
}

type Tab = 'pending' | 'active' | 'suspended' | 'all'

export default function MembersPage() {
  const [members, setMembers]   = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [tab, setTab]           = useState<Tab>('pending')
  const [search, setSearch]     = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [success, setSuccess]   = useState(false)
  const [actionId, setActionId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', idNumber: '',
    category: 'NUCLEAR', package: 'COMBINED',
    registrationDate: '', nextOfKin: '',
  })
  const [deps, setDeps] = useState<{ name: string; relationship: string; dob: string }[]>([])

  const addDep    = () => setDeps(d => [...d, { name: '', relationship: '', dob: '' }])
  const removeDep = (i: number) => setDeps(d => d.filter((_, j) => j !== i))
  const updateDep = (i: number, key: string, val: string) =>
    setDeps(d => d.map((dep, j) => j === i ? { ...dep, [key]: val } : dep))

  const [addingDepFor, setAddingDepFor] = useState<string | null>(null)
  const [newDep, setNewDep] = useState({ name: '', relationship: '', dob: '' })
  const [depSaving, setDepSaving] = useState(false)

  const submitNewDep = async (memberId: string) => {
    if (!newDep.name || !newDep.relationship) return
    setDepSaving(true)
    try {
      await fetch(`${API}/api/members/${memberId}/dependants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ dependants: [newDep] }),
      })
      setNewDep({ name: '', relationship: '', dob: '' })
      setAddingDepFor(null)
      await fetchMembers()
    } catch { alert('Failed to add dependant') }
    finally { setDepSaving(false) }
  }

  const deleteDependant = async (memberId: string, depId: string) => {
    if (!confirm('Remove this dependant?')) return
    await fetch(`${API}/api/members/${memberId}/dependants/${depId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await fetchMembers()
  }

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/members`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch { setMembers([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  const updateStatus = async (id: string, status: string) => {
    setActionId(id)
    await fetch(`${API}/api/members/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ status }),
    })
    await fetchMembers()
    setActionId(null)
  }

  const deleteMember = async (id: string) => {
    if (!confirm('Permanently reject and delete this application?')) return
    setActionId(id)
    await fetch(`${API}/api/members/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await fetchMembers()
    setActionId(null)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${API}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ ...form, dependants: deps.filter(d => d.name) }),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', idNumber: '', category: 'NUCLEAR', package: 'COMBINED', registrationDate: '', nextOfKin: '' })
      setDeps([])
      fetchMembers()
      setTimeout(() => { setSuccess(false); setShowForm(false) }, 2000)
    } catch { alert('Failed to add member') }
    finally { setSaving(false) }
  }

  const filtered = members.filter(m => {
    const matchTab =
      tab === 'all'       ? true :
      tab === 'pending'   ? m.status === 'PENDING' :
      tab === 'active'    ? m.status === 'ACTIVE' :
      tab === 'suspended' ? m.status === 'SUSPENDED' : true
    const q = search.toLowerCase()
    const matchSearch = !q || m.name?.toLowerCase().includes(q) || m.phone?.includes(q) || m.idNumber?.includes(q) || m.email?.toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  const counts = {
    pending:   members.filter(m => m.status === 'PENDING').length,
    active:    members.filter(m => m.status === 'ACTIVE').length,
    suspended: members.filter(m => m.status === 'SUSPENDED').length,
    all:       members.length,
  }

  const tabs: { key: Tab; label: string; color: string }[] = [
    { key: 'pending',   label: 'New Applicants', color: 'text-amber-600'  },
    { key: 'active',    label: 'Active',          color: 'text-green-600'  },
    { key: 'suspended', label: 'Suspended',       color: 'text-red-500'    },
    { key: 'all',       label: 'All Members',     color: 'text-[#1a1f5e]' },
  ]

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1f5e]">Members</h1>
          <p className="text-gray-400 text-sm">Manage applications and active members</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm gap-2">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* New applicants alert banner */}
      {counts.pending > 0 && tab !== 'pending' && (
        <button onClick={() => setTab('pending')}
          className="w-full mb-5 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 flex items-center gap-3 hover:bg-amber-100 transition-colors text-left">
          <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
            <Clock size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-amber-800 text-sm">
              {counts.pending} new application{counts.pending !== 1 ? 's' : ''} waiting for review
            </p>
            <p className="text-amber-600 text-xs">Click to review and approve or reject</p>
          </div>
          <span className="text-amber-500 text-sm font-semibold">Review →</span>
        </button>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-5 shadow-sm overflow-x-auto">
        {tabs.map(({ key, label, color }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              tab === key ? 'bg-[#1a1f5e] text-white shadow' : 'text-gray-500 hover:text-[#1a1f5e] hover:bg-gray-50'
            }`}>
            {label}
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              tab === key ? 'bg-white/20 text-white' : `bg-gray-100 ${color}`
            }`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, phone, or ID…"
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#0ea5e9]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Users size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">
            {tab === 'pending' ? 'No pending applications right now.' : 'No members found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(m => (
            <div key={m.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                m.status === 'PENDING'   ? 'border-amber-200'  :
                m.status === 'ACTIVE'    ? 'border-green-100'  :
                'border-red-100'
              }`}>
              {/* Row header */}
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ${
                  m.status === 'PENDING'   ? 'bg-amber-400'   :
                  m.status === 'ACTIVE'    ? 'bg-[#22c55e]'   :
                  'bg-red-400'
                }`}>
                  {m.name?.charAt(0)?.toUpperCase() || 'M'}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-[#1a1f5e]">{m.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      m.status === 'ACTIVE'    ? 'bg-green-100 text-green-700' :
                      m.status === 'PENDING'   ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'}`}>
                      {m.status === 'PENDING' ? 'Awaiting Approval' : m.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Phone size={11} />{m.phone}</span>
                    {m.email && <span className="flex items-center gap-1"><Mail size={11} />{m.email}</span>}
                    <span className="flex items-center gap-1"><CreditCard size={11} />ID: {m.idNumber}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} />{new Date(m.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Package badge */}
                <div className="hidden sm:block shrink-0 text-right">
                  <p className="text-xs text-gray-400">Package</p>
                  <p className="text-sm font-semibold text-[#1a1f5e]">{PKG_LABEL[m.package] || m.package}</p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {m.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updateStatus(m.id, 'ACTIVE')}
                        disabled={actionId === m.id}
                        className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {actionId === m.id ? <Loader2 size={13} className="animate-spin" /> : <UserCheck size={13} />}
                        Approve
                      </button>
                      <button
                        onClick={() => deleteMember(m.id)}
                        disabled={actionId === m.id}
                        className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                      >
                        <UserX size={13} /> Reject
                      </button>
                    </>
                  )}
                  {m.status === 'ACTIVE' && (
                    <button
                      onClick={() => updateStatus(m.id, 'SUSPENDED')}
                      disabled={actionId === m.id}
                      className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {actionId === m.id ? <Loader2 size={13} className="animate-spin" /> : <UserX size={13} />}
                      Suspend
                    </button>
                  )}
                  {m.status === 'SUSPENDED' && (
                    <button
                      onClick={() => updateStatus(m.id, 'ACTIVE')}
                      disabled={actionId === m.id}
                      className="flex items-center gap-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {actionId === m.id ? <Loader2 size={13} className="animate-spin" /> : <UserCheck size={13} />}
                      Reinstate
                    </button>
                  )}

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1a1f5e] hover:bg-gray-100 rounded-xl"
                  >
                    {expanded === m.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expanded === m.id && (
                <div className={`border-t px-5 py-4 text-sm ${
                  m.status === 'PENDING' ? 'bg-amber-50/50 border-amber-100' :
                  m.status === 'ACTIVE'  ? 'bg-green-50/50 border-green-100' :
                  'bg-red-50/30 border-red-100'
                }`}>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Family Category</p>
                      <p className="font-semibold text-[#1a1f5e]">{CAT_LABEL[m.category] || m.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Package</p>
                      <p className="font-semibold text-[#1a1f5e]">{PKG_LABEL[m.package] || m.package}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Applied On</p>
                      <p className="font-semibold text-[#1a1f5e]">
                        {new Date(m.createdAt).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                        Dependants ({m.dependants?.length || 0})
                      </p>
                      <button
                        type="button"
                        onClick={() => { setAddingDepFor(addingDepFor === m.id ? null : m.id); setNewDep({ name: '', relationship: '', dob: '' }) }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0ea5e9] hover:text-blue-700"
                      >
                        <Plus size={12} /> Add Dependant
                      </button>
                    </div>
                    {m.dependants?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.dependants.map((d: any) => (
                          <div key={d.id} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs">
                            <span className="font-semibold text-[#1a1f5e]">{d.name}</span>
                            <span className="text-gray-400">· {d.relationship}</span>
                            {d.dob && <span className="text-gray-400">· {new Date(d.dob).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                            <button
                              type="button"
                              onClick={() => deleteDependant(m.id, d.id)}
                              className="ml-1 text-red-300 hover:text-red-500"
                              title="Remove dependant"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {addingDepFor === m.id && (
                      <div className="bg-white border border-[#0ea5e9]/30 rounded-xl p-3 mt-1">
                        <p className="text-xs font-bold text-[#1a1f5e] mb-2">New Dependant</p>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
                            <input value={newDep.name} onChange={e => setNewDep(n => ({ ...n, name: e.target.value }))}
                              placeholder="Full name"
                              className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Relationship *</label>
                            <select value={newDep.relationship} onChange={e => setNewDep(n => ({ ...n, relationship: e.target.value }))}
                              className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
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
                            <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                            <input type="date" value={newDep.dob} onChange={e => setNewDep(n => ({ ...n, dob: e.target.value }))}
                              className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setAddingDepFor(null)}
                            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded-lg">Cancel</button>
                          <button type="button" onClick={() => submitNewDep(m.id)}
                            disabled={!newDep.name || !newDep.relationship || depSaving}
                            className="flex items-center gap-1 text-xs font-semibold bg-[#1a1f5e] text-white px-3 py-1.5 rounded-lg disabled:opacity-40 hover:bg-blue-900">
                            {depSaving ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />} Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {m.status === 'PENDING' && (
                    <div className="flex gap-2 mt-4 pt-4 border-t border-amber-100">
                      <button
                        onClick={() => updateStatus(m.id, 'ACTIVE')}
                        disabled={actionId === m.id}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {actionId === m.id ? <Loader2 size={14} className="animate-spin" /> : <UserCheck size={14} />}
                        Approve & Activate Membership
                      </button>
                      <button
                        onClick={() => deleteMember(m.id)}
                        disabled={actionId === m.id}
                        className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                      >
                        <UserX size={14} /> Reject Application
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b shrink-0">
              <h2 className="font-bold text-[#1a1f5e] text-lg">Add Member Manually</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            {success ? (
              <div className="p-12 text-center">
                <CheckCircle2 size={48} className="text-[#22c55e] mx-auto mb-3" />
                <p className="font-bold text-[#1a1f5e]">Member Added Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="p-6 space-y-5 overflow-y-auto">

                {/* Personal Details */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Personal Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">National ID Number *</label>
                      <input required value={form.idNumber} onChange={e => setForm({ ...form, idNumber: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        placeholder="e.g. 12345678" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        placeholder="07XX XXX XXX" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email Address (optional)</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Registration Date *</label>
                      <input type="date" required value={form.registrationDate} onChange={e => setForm({ ...form, registrationDate: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Next of Kin *</label>
                      <input required value={form.nextOfKin} onChange={e => setForm({ ...form, nextOfKin: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                        placeholder="e.g. Jane Otieno" />
                    </div>
                  </div>
                </div>

                {/* Package */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Package Selection</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Family Category *</label>
                      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
                        <option value="NUCLEAR">Nuclear Family</option>
                        <option value="NUCLEAR_PARENTS">Nuclear + Principal's Parents</option>
                        <option value="NUCLEAR_BOTH_PARENTS">Nuclear + Both Parents</option>
                        <option value="EXTENDED_FAMILY">Extended Family</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Welfare Package *</label>
                      <select value={form.package} onChange={e => setForm({ ...form, package: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
                        <option value="MEDICAL">Medical Only</option>
                        <option value="LAST_EXPENSE">Last Expense Only</option>
                        <option value="COMBINED">Medical + Last Expense</option>
                        <option value="EDUCATION">Child Education Savings</option>
                        <option value="MEDICAL_EDUCATION">Medical + Education</option>
                        <option value="LAST_EDUCATION">Last Expense + Education</option>
                        <option value="MEDICAL_LAST_EDUCATION">Medical + Last Expense + Education</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dependants */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Dependants (optional)</p>
                    <button type="button" onClick={addDep}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0ea5e9] hover:text-blue-700">
                      <Plus size={13} /> Add Dependant
                    </button>
                  </div>
                  {deps.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                      No dependants added. Click "Add Dependant" to include family members.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {deps.map((d, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-3 border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-[#1a1f5e] uppercase tracking-wide">Dependant {i + 1}</span>
                            <button type="button" onClick={() => removeDep(i)} className="text-red-400 hover:text-red-600 p-0.5">
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                              <input value={d.name} onChange={e => updateDep(i, 'name', e.target.value)}
                                placeholder="Full name"
                                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Relationship *</label>
                              <select value={d.relationship} onChange={e => updateDep(i, 'relationship', e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
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
                                className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-200 rounded-xl py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={saving}
                    className="flex-1 btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 justify-center !text-sm">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : 'Add Member'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
