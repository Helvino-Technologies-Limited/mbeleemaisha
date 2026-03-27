'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const nav = [
  { href: '/admin/dashboard',     label: 'Dashboard',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/members',       label: 'Members',       icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { href: '/admin/announcements', label: 'Announcements', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { href: '/admin/content',       label: 'Content',       icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { href: '/admin/media',         label: 'Media',         icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/admin/settings',      label: 'Settings',      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

function SvgIcon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) router.replace('/admin')
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin')
  }

  const active = (href: string) => pathname === href

  const bottomNav = nav.slice(0, 5)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex w-64 bg-[#1a1f5e] flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img src="/images/logo.png" alt="Logo" className="w-9 h-9 object-contain" onError={(e: any) => { e.target.style.display='none' }} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Mbelee Maisha</p>
              <p className="text-white/40 text-xs">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map(({ href, label, icon }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${active(href) ? 'bg-white text-[#1a1f5e] shadow' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <SvgIcon d={icon} />
              {label}
              {active(href) && <span className="ml-auto w-2 h-2 bg-[#ec4899] rounded-full" />}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <aside className="relative w-72 bg-[#1a1f5e] flex flex-col h-full z-50 shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/images/logo.png" alt="Logo" className="w-9 h-9 object-contain" onError={(e: any) => { e.target.style.display='none' }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Mbelee Maisha</p>
                  <p className="text-white/40 text-xs">Admin Portal</p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {nav.map(({ href, label, icon }) => (
                <Link key={href} href={href} onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all
                    ${active(href) ? 'bg-white text-[#1a1f5e] shadow' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                  <SvgIcon d={icon} />
                  {label}
                  {active(href) && <span className="ml-auto w-2 h-2 bg-[#ec4899] rounded-full" />}
                </Link>
              ))}
            </nav>

            <div className="p-3 border-t border-white/10">
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile Top Bar */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
          <button onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1a1f5e] rounded-full flex items-center justify-center overflow-hidden">
              <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" onError={(e: any) => { e.target.style.display='none' }} />
            </div>
            <span className="font-bold text-[#1a1f5e] text-sm">Mbelee Maisha</span>
          </div>
          <button onClick={handleLogout} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </button>
        </header>

        {/* Desktop Top Bar */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4 items-center justify-between shadow-sm flex-shrink-0">
          <div>
            <h2 className="font-bold text-[#1a1f5e] text-lg capitalize">
              {nav.find(n => n.href === pathname)?.label || 'Admin'}
            </h2>
            <p className="text-gray-400 text-xs">Mbelee Maisha Management Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1a1f5e] rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>

        {/* ── MOBILE BOTTOM NAV (Facebook style) ── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 shadow-lg">
          <div className="flex items-center justify-around">
            {bottomNav.map(({ href, label, icon }) => (
              <Link key={href} href={href}
                className={`flex flex-col items-center gap-0.5 px-2 py-2.5 flex-1 transition-all
                  ${active(href) ? 'text-[#1a1f5e]' : 'text-gray-400'}`}>
                <div className={`relative p-1.5 rounded-xl transition-all ${active(href) ? 'bg-[#1a1f5e]/10' : ''}`}>
                  <SvgIcon d={icon} />
                  {active(href) && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ec4899] rounded-full border border-white" />
                  )}
                </div>
                <span className={`text-xs font-medium ${active(href) ? 'text-[#1a1f5e]' : 'text-gray-400'}`}>
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

      </div>
    </div>
  )
}
