'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const router                  = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#1a1f5e] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Logo" className="w-16 h-16 mx-auto mb-4 object-contain" />
          <h1 className="text-2xl font-bold text-[#1a1f5e]">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Mbelee Maisha Management Portal</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              placeholder="admin@mbeleemaisha.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center !bg-[#1a1f5e] hover:!bg-blue-900">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
