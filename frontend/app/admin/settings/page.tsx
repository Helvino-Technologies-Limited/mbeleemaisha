'use client'
import { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Loader2 } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL
function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('adminToken') : ''
}

export default function SettingsPage() {
  const [form, setForm]     = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]       = useState('')

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword !== form.confirm) { setMsg('Passwords do not match'); return }
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch(`${API}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      })
      if (!res.ok) throw new Error('Failed')
      setMsg('✅ Password changed successfully')
      setForm({ currentPassword: '', newPassword: '', confirm: '' })
    } catch { setMsg('❌ Failed. Check your current password.') }
    finally { setSaving(false) }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your admin account</p>
      </div>
      <div className="max-w-md">
        <div className="card p-8">
          <h2 className="font-bold text-[#1a1f5e] text-lg mb-6">Change Password</h2>
          {msg && (
            <div className={`text-sm px-4 py-3 rounded-xl mb-4 ${msg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {msg}
            </div>
          )}
          <form onSubmit={handleChange} className="space-y-4">
            {[
              { label: 'Current Password', key: 'currentPassword' },
              { label: 'New Password',     key: 'newPassword' },
              { label: 'Confirm Password', key: 'confirm' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type="password" required value={(form as any)[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  placeholder="••••••••" />
              </div>
            ))}
            <button type="submit" disabled={saving}
              className="w-full btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 justify-center">
              {saving ? <Loader2 size={16} className="animate-spin" /> : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
