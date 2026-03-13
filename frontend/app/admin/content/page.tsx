'use client'
import AdminLayout from '@/components/layout/AdminLayout'
import { FileText } from 'lucide-react'

export default function ContentPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Content Management</h1>
        <p className="text-gray-500 text-sm">Manage website text and page content</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { page: 'Home Page',         desc: 'Hero text, About preview, CTA section' },
          { page: 'About Page',        desc: 'Mission, vision, story content' },
          { page: 'Services Page',     desc: 'Package descriptions and details' },
          { page: 'Membership Page',   desc: 'Requirements and payment info' },
          { page: 'Contact Page',      desc: 'Office address, hours, phone number' },
        ].map(({ page, desc }) => (
          <div key={page} className="card p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-[#1a1f5e]/10 rounded-xl flex items-center justify-center shrink-0">
              <FileText size={18} className="text-[#1a1f5e]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1a1f5e] mb-1">{page}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
            <button className="text-xs bg-[#0ea5e9]/10 text-[#0ea5e9] px-3 py-1.5 rounded-lg hover:bg-[#0ea5e9]/20 font-medium">
              Edit
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
