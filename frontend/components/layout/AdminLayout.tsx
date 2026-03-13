'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Bell, FileText, Image, LogOut, Settings } from 'lucide-react'
import clsx from 'clsx'

const nav = [
  { href: '/admin/dashboard',     icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/members',       icon: Users,           label: 'Members' },
  { href: '/admin/announcements', icon: Bell,            label: 'Announcements' },
  { href: '/admin/content',       icon: FileText,        label: 'Content' },
  { href: '/admin/media',         icon: Image,           label: 'Media' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <aside className="w-64 bg-[#1a1f5e] flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="w-10 h-10 bg-white rounded-full p-1 object-contain" />
            <div>
              <p className="text-white font-bold text-sm">Mbelee Maisha</p>
              <p className="text-white/40 text-xs">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className={clsx('sidebar-link', pathname === href && '!bg-white/20 !text-white')}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/admin/settings" className="sidebar-link"><Settings size={18} /> Settings</Link>
          <Link href="/admin" className="sidebar-link !text-red-400 hover:!text-red-300 hover:!bg-red-500/10">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
