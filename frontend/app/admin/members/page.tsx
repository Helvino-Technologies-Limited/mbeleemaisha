'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { X, Plus, Loader2, CheckCircle2, Users } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('adminToken') : ''
}

export default function MembersPage() {
  const [members, setMembers]   = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [success, setSuccess]   = useState(false)
  const [form, setForm]         = useState({
    name: '', phone: '', email: '', idNumber: '',
    category: 'NUCLEAR', package: 'COMBINED',
  })

  useEffect(() => { fetchMembers() }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API}/api/members`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch (e) { setMembers([]) }
    finally { setLoading(false) }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${API}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', idNumber: '', category: 'NUCLEAR', package: 'COMBINED' })
      fetchMembers()
      setTimeout(() => { setSuccess(false); setShowForm(false) }, 2000)
    } catch { alert('Failed to add member') }
    finally { setSaving(false) }
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API}/api/members/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ status }),
    })
    fetchMembers()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1f5e]">Members</h1>
          <p className="text-gray-500 text-sm">Manage all member registrations</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm gap-2">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-[#1a1f5e] text-lg">Add New Member</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            {success ? (
              <div className="p-12 text-center">
                <CheckCircle2 size={48} className="text-[#22c55e] mx-auto mb-3" />
                <p className="font-bold text-[#1a1f5e]">Member Added Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      placeholder="07XX XXX XXX" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">ID Number *</label>
                    <input required value={form.idNumber} onChange={e => setForm({ ...form, idNumber: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      placeholder="National ID" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
                    <option value="NUCLEAR">Nuclear Family</option>
                    <option value="NUCLEAR_PARENTS">Nuclear + Parents of Principal</option>
                    <option value="NUCLEAR_BOTH_PARENTS">Nuclear + Parents of Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Package *</label>
                  <select value={form.package} onChange={e => setForm({ ...form, package: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
                    <option value="MEDICAL">Medical Only</option>
                    <option value="LAST_EXPENSE">Last Expense Only</option>
                    <option value="COMBINED">Medical + Last Expense</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-200 rounded-xl py-2 text-sm text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
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

      {/* Members Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin text-[#0ea5e9]" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No members yet. Add your first member above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1f5e] text-white text-xs">
                <tr>
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3">Phone</th>
                  <th className="text-left px-5 py-3">Package</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id} className={`text-sm border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-5 py-4 font-medium text-[#1a1f5e]">{m.name}</td>
                    <td className="px-5 py-4 text-gray-600">{m.phone}</td>
                    <td className="px-5 py-4 text-gray-600">{m.package}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        m.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                        m.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {m.status !== 'ACTIVE' && (
                          <button onClick={() => updateStatus(m.id, 'ACTIVE')}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200">
                            Approve
                          </button>
                        )}
                        {m.status !== 'SUSPENDED' && (
                          <button onClick={() => updateStatus(m.id, 'SUSPENDED')}
                            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200">
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
