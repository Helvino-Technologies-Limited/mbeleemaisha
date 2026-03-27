import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })
const inter  = Inter({ subsets: ['latin'], variable: '--font-inter',  display: 'swap' })

export const metadata: Metadata = {
  title: 'Mbelee Maisha Welfare Organization',
  description: 'Supporting families with medical, funeral, and education welfare packages across Kenya.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
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
