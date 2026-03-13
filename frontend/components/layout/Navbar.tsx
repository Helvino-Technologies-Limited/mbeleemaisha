'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/',              label: 'Home' },
  { href: '/about',         label: 'About' },
  { href: '/services',      label: 'Services' },
  { href: '/membership',    label: 'Membership' },
  { href: '/contributions', label: 'Packages' },
  { href: '/contact',       label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#1a1f5e]/95 backdrop-blur-md shadow-2xl' : 'bg-[#1a1f5e]'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-full p-1 shadow-lg">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-lg leading-none">Mbelee Maisha</p>
              <p className="text-[#0ea5e9] text-xs mt-0.5">Welfare Organization</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={clsx('nav-link', pathname === l.href && '!bg-white/20 !text-white')}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:0140166773"
               className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
              <Phone size={14} /> 0140-166773
            </a>
            <Link href="/membership" className="hidden md:block btn-primary !py-2 !px-5 !text-sm">
              Join Now
            </Link>
            <button onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#1a1f5e] border-t border-white/10 px-4 py-4 space-y-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={clsx(
                'block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium',
                pathname === l.href && 'bg-white/15 text-white'
              )}>
              {l.label}
            </Link>
          ))}
          <Link href="/membership" onClick={() => setOpen(false)}
            className="block btn-primary justify-center mt-3 !text-sm">
            Become a Member
          </Link>
        </div>
      )}
    </nav>
  )
}
