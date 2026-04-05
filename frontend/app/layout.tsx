import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })
const inter  = Inter({ subsets: ['latin'], variable: '--font-inter',  display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://mbeleemaisha.org'),
  title: {
    default: 'Mbelee Maisha Welfare Organization | Kenya',
    template: '%s | Mbelee Maisha Welfare Organization',
  },
  description:
    'Mbelee Maisha is a registered welfare organization in Kenya offering medical coverage, funeral (last expense) support, and child education savings plans. Join today and protect your family.',
  keywords: [
    'welfare organization Kenya',
    'funeral cover Kenya',
    'last expense insurance Kenya',
    'medical welfare Kenya',
    'education savings Kenya',
    'Siaya welfare group',
    'Mbelee Maisha',
    'mbeleemaisha.org',
    'funeral welfare Kenya',
    'Kenya savings group',
    'family protection Kenya',
  ],
  authors: [{ name: 'Mbelee Maisha Welfare Organization', url: 'https://mbeleemaisha.org' }],
  creator: 'Mbelee Maisha Welfare Organization',
  publisher: 'Mbelee Maisha Welfare Organization',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://mbeleemaisha.org' },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://mbeleemaisha.org',
    siteName: 'Mbelee Maisha Welfare Organization',
    title: 'Mbelee Maisha Welfare Organization | Kenya',
    description:
      'Protect your family with medical cover, funeral support, and education savings. Join Kenya\'s trusted welfare organization today.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mbelee Maisha Welfare Organization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mbelee Maisha Welfare Organization | Kenya',
    description:
      'Medical cover, funeral support & education savings for Kenyan families. Register today.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  verification: {
    google: 'mbeleemaisha-google-site-verification',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} bg-white text-gray-900 antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
