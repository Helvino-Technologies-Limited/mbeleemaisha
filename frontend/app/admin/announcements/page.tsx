'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { X, Plus, Loader2, Trash2, Bell } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL
function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('adminToken') : ''
}

export default function AnnouncementsPage() {
  const [items, setItems]       = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [form, setForm]         = useState({ title: '', content: '' })

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    try {
      const res  = await fetch(`${API}/api/announcements`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch { setItems([]) }
    finally { setLoading(false) }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${API}/api/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setForm({ title: '', content: '' })
      setShowForm(false)
      fetchItems()
    } catch { alert('Failed to post announcement') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await fetch(`${API}/api/announcements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    fetchItems()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1f5e]">Announcements</h1>
          <p className="text-gray-500 text-sm">Post updates visible to website visitors</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm gap-2">
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-[#1a1f5e] text-lg">New Announcement</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  placeholder="Announcement title" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content *</label>
                <textarea required rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  placeholder="Write your announcement here..." />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 rounded-xl py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 justify-center !text-sm">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : 'Post Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={32} className="animate-spin text-[#0ea5e9]" /></div>
        ) : items.length === 0 ? (
          <div className="card p-16 text-center">
            <Bell size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No announcements yet.</p>
          </div>
        ) : items.map(item => (
          <div key={item.id} className="card p-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-[#1a1f5e] mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
              <p className="text-gray-400 text-xs mt-2">{new Date(item.createdAt).toLocaleDateString('en-KE')}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 shrink-0">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
