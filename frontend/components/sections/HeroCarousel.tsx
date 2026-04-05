'use client'
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=85&auto=format&fit=crop',
    alt: 'Happy Mbelee Maisha members celebrating together',
    tag: 'Our Community',
    title: 'Families Protected,\nSmiles Guaranteed',
    subtitle:
      'Join thousands of Kenyan families who sleep peacefully knowing Mbelee Maisha has them covered.',
    cta: { label: 'Become a Member', href: '/membership' },
  },
  {
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1600&q=85&auto=format&fit=crop',
    alt: 'Kenyan family safe at home with welfare coverage',
    tag: 'Family First',
    title: 'Your Family Deserves\nthe Best Protection',
    subtitle:
      'Medical bills, funeral support, and your children\'s education — all covered under one welfare family.',
    cta: { label: 'View Our Packages', href: '/services' },
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85&auto=format&fit=crop',
    alt: 'Medical welfare coverage Kenya hospital',
    tag: 'Medical Cover',
    title: 'Up to KSH 100,000\nin Medical Coverage',
    subtitle:
      'We cover hospital bills at public and mission hospitals so you focus on recovery, not bills.',
    cta: { label: 'Learn More', href: '/services' },
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=85&auto=format&fit=crop',
    alt: 'Dignified funeral ceremony last expense support Kenya',
    tag: 'Last Expense',
    title: 'Send Loved Ones Off\nwith Dignity',
    subtitle:
      'Cash support, coffin, mortuary, transport, tents, and chairs — we handle every detail with care.',
    cta: { label: 'Last Expense Package', href: '/services' },
  },
  {
    src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&q=85&auto=format&fit=crop',
    alt: 'Children education savings plan Kenya Grade 1 to 4',
    tag: 'Education Savings',
    title: 'Invest in Your\nChild\'s Future Today',
    subtitle:
      'Save KSH 350 per month per child and secure their school fees for Grade 1 through Grade 4.',
    cta: { label: 'Education Savings', href: '/services' },
  },
  {
    src: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=85&auto=format&fit=crop',
    alt: 'Mbelee Maisha community welfare meeting Kenya',
    tag: 'Join Us',
    title: 'Be Part of a\nCaring Community',
    subtitle:
      'Register for just KSH 200 and gain immediate access to all three welfare packages.',
    cta: { label: 'Register Now', href: '/membership' },
  },
]

const AUTOPLAY_MS = 5000

export default function HeroCarousel() {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]       = useState(false)

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir)
      setCurrent((next + slides.length) % slides.length)
    },
    [],
  )

  const prev = () => go(current - 1, -1)
  const next = () => go(current + 1,  1)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => go(current + 1, 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [current, paused, go])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'min(90vh, 680px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1140]/80 via-[#0d1140]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1140]/60 via-transparent to-transparent" />

          {/* Text content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-xl"
              >
                <span className="inline-block bg-[#0ea5e9]/25 border border-[#0ea5e9]/40 text-[#7dd3fc] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5">
                  {slides[current].tag}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 whitespace-pre-line">
                  {slides[current].title}
                </h2>
                <p className="text-white/75 text-base leading-relaxed mb-8 max-w-md">
                  {slides[current].subtitle}
                </p>
                <Link
                  href={slides[current].cta.href}
                  className="inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
                >
                  {slides[current].cta.label}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-white/30 border border-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-white/30 border border-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-white w-7 h-2.5'
                : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-0.5 bg-[#0ea5e9] origin-left z-20 w-full"
        />
      )}

      {/* Slide counter */}
      <div className="absolute top-5 right-5 z-20 bg-black/30 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-mono px-3 py-1.5 rounded-full">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  )
}
