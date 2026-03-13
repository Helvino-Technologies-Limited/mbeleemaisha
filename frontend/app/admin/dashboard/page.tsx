'use client'
import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('adminToken') : ''
}

export default function DashboardPage() {
  const [stats, setStats]             = useState({ total: 0, newThisMonth: 0, active: 0, pending: 0, suspended: 0 })
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [members, setMembers]         = useState<any[]>([])
  const [contacts, setContacts]       = useState<any[]>([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${getToken()}` }
    Promise.all([
      fetch(`${API}/api/members/stats`, { headers }).then(r => r.json()).catch(() => ({})),
      fetch(`${API}/api/members?limit=5`, { headers }).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/announcements`).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/contact`, { headers }).then(r => r.json()).catch(() => []),
    ]).then(([s, m, a, c]) => {
      setStats({
        total:        s.total        || 0,
        newThisMonth: s.newThisMonth || 0,
        active:       s.active       || 0,
        pending:      s.pending      || 0,
        suspended:    s.suspended    || 0,
      })
      setMembers(Array.isArray(m) ? m.slice(0, 5) : [])
      setAnnouncements(Array.isArray(a) ? a.slice(0, 3) : [])
      setContacts(Array.isArray(c) ? c.slice(0, 3) : [])
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: 'Total Members',      value: stats.total,        color: 'bg-[#1a1f5e]', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', href: '/admin/members' },
    { label: 'Active Members',     value: stats.active,       color: 'bg-[#22c55e]', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                                                                                          href: '/admin/members' },
    { label: 'Pending Approval',   value: stats.pending,      color: 'bg-[#f59e0b]', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                                                                                            href: '/admin/members' },
    { label: 'New This Month',     value: stats.newThisMonth, color: 'bg-[#0ea5e9]', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',                                                                                                                                                                                                                         href: '/admin/members' },
    { label: 'Announcements',      value: announcements.length, color: 'bg-[#ec4899]', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', href: '/admin/announcements' },
    { label: 'Messages Received',  value: contacts.length,    color: 'bg-[#8b5cf6]', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',                                                                                                                                                href: '/admin/members' },
  ]

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Welcome back, Admin</h1>
        <p className="text-gray-400 text-sm mt-1">{new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(({ label, value, color, icon, href }) => (
          <Link key={label} href={href}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </div>
              {loading && (
                <div className="w-4 h-4 border-2 border-gray-200 border-t-[#0ea5e9] rounded-full animate-spin" />
              )}
            </div>
            <p className="text-3xl font-bold text-[#1a1f5e]">{loading ? '—' : value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Members */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-bold text-[#1a1f5e]">Recent Members</h2>
            <Link href="/admin/members" className="text-xs text-[#0ea5e9] font-semibold hover:underline">View All</Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0ea5e9] rounded-full animate-spin" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" className="mx-auto mb-3"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <p className="text-gray-400 text-sm">No members yet</p>
              <Link href="/admin/members" className="text-xs text-[#0ea5e9] font-semibold mt-1 inline-block">Add first member</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {members.map((m: any) => (
                <div key={m.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50">
                  <div className="w-9 h-9 bg-[#1a1f5e] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {m.name?.charAt(0)?.toUpperCase() || 'M'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1a1f5e] text-sm truncate">{m.name}</p>
                    <p className="text-gray-400 text-xs">{m.phone} · {m.package}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold shrink-0 ${
                    m.status === 'ACTIVE'    ? 'bg-green-100 text-green-700' :
                    m.status === 'PENDING'   ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">

          {/* Recent Announcements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-bold text-[#1a1f5e]">Recent Announcements</h2>
              <Link href="/admin/announcements" className="text-xs text-[#0ea5e9] font-semibold hover:underline">View All</Link>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0ea5e9] rounded-full animate-spin" />
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No announcements yet</p>
                <Link href="/admin/announcements" className="text-xs text-[#0ea5e9] font-semibold mt-1 inline-block">Post one</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {announcements.map((a: any) => (
                  <div key={a.id} className="px-5 py-3.5 hover:bg-gray-50">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#ec4899] rounded-full mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1a1f5e] text-sm truncate">{a.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{a.content}</p>
                      </div>
                      <p className="text-gray-300 text-xs shrink-0">{new Date(a.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-bold text-[#1a1f5e]">Recent Messages</h2>
              <span className="text-xs text-gray-400">{contacts.length} total</span>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0ea5e9] rounded-full animate-spin" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No messages yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {contacts.map((c: any) => (
                  <div key={c.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50">
                    <div className="w-9 h-9 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {c.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1a1f5e] text-sm">{c.name}</p>
                      <p className="text-gray-400 text-xs truncate">{c.message}</p>
                    </div>
                    <p className="text-gray-300 text-xs shrink-0">{new Date(c.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}
