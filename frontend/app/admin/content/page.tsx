'use client'
import React, { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'

const pages = [
  {
    id: 'home',
    page: 'Home Page',
    desc: 'Hero text, About preview, CTA section',
    fields: [
      { key: 'hero_title',    label: 'Hero Title',      type: 'text',     def: 'Protecting Families, Preserving Dignity' },
      { key: 'hero_subtitle', label: 'Hero Subtitle',   type: 'textarea', def: 'Mbelee Maisha supports members through medical emergencies, last expense coverage, and education savings.' },
      { key: 'cta_text',      label: 'CTA Button Text', type: 'text',     def: 'Become a Member' },
    ],
  },
  {
    id: 'about',
    page: 'About Page',
    desc: 'Mission, vision, story content',
    fields: [
      { key: 'mission', label: 'Mission Statement', type: 'textarea', def: 'To support members and beneficiaries in footing medical bills and funeral expenses while maintaining dignity.' },
      { key: 'vision',  label: 'Vision Statement',  type: 'textarea', def: 'To become a premier welfare services provider and employer of many unemployed women and youth across Kenya.' },
      { key: 'story',   label: 'Our Story',         type: 'textarea', def: 'Mbelee Maisha Welfare Organization was founded with a clear purpose: to provide a safety net for families during their most vulnerable moments.' },
    ],
  },
  {
    id: 'services',
    page: 'Services Page',
    desc: 'Package descriptions and details',
    fields: [
      { key: 'medical_desc',   label: 'Medical Package Description',  type: 'textarea', def: 'Mbelee Maisha pays hospital bills when a member is admitted in public and mission hospitals.' },
      { key: 'funeral_desc',   label: 'Last Expense Description',     type: 'textarea', def: 'In times of grief, Mbelee Maisha offers last respect services to members and their beneficiaries.' },
      { key: 'education_desc', label: 'Child Education Description',  type: 'textarea', def: 'A voluntary savings plan for members who want to invest in their children\'s future education.' },
    ],
  },
  {
    id: 'membership',
    page: 'Membership Page',
    desc: 'Requirements and payment info',
    fields: [
      { key: 'reg_fee',      label: 'Registration Fee (KSH)',       type: 'text',     def: '200' },
      { key: 'paybill',      label: 'MPESA Paybill Number',         type: 'text',     def: '247247' },
      { key: 'account',      label: 'MPESA Account Number',         type: 'text',     def: '529152' },
      { key: 'requirements', label: 'Requirements (one per line)',  type: 'textarea', def: 'Must be 18 years and above\nMust be of good character and sound mind\nMust fill and sign the application form\nMust pay KSH 200 registration fee' },
    ],
  },
  {
    id: 'contact',
    page: 'Contact Page',
    desc: 'Office address, hours, phone number',
    fields: [
      { key: 'phone',   label: 'Phone Number',   type: 'text',     def: '0140-166773' },
      { key: 'email',   label: 'Email Address',  type: 'text',     def: 'info@mbeleemaisha.com' },
      { key: 'address', label: 'Office Address', type: 'textarea', def: 'P.O Box 68 Siaya, Awello Junction along Siaya Kadenge Road' },
      { key: 'hours',   label: 'Working Hours',  type: 'textarea', def: 'Monday - Friday: 8:00AM - 5:00PM\nWeekends: On call support' },
    ],
  },
]

export default function ContentPage() {
  const [activeId, setActiveId]   = React.useState<string | null>(null)
  const [formData, setFormData]   = React.useState<Record<string, string>>({})
  const [saving, setSaving]       = React.useState(false)
  const [saved, setSaved]         = React.useState(false)

  const openModal = (id: string) => {
    const p = pages.find(x => x.id === id)
    if (!p) return
    const d: Record<string, string> = {}
    p.fields.forEach(f => { d[f.key] = f.def })
    setFormData(d)
    setSaved(false)
    setActiveId(id)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => { setSaved(false); setActiveId(null) }, 1500)
  }

  const activePage = pages.find(x => x.id === activeId)

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Content Management</h1>
        <p className="text-gray-500 text-sm">Manage website text and page content</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {pages.map(({ id, page, desc }) => (
          <div key={id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-[#1a1f5e]/10 rounded-xl flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#1a1f5e] mb-1">{page}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
            <button
              onClick={() => openModal(id)}
              className="shrink-0 text-xs bg-[#0ea5e9]/10 text-[#0ea5e9] px-3 py-1.5 rounded-lg hover:bg-[#0ea5e9]/20 font-semibold transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {activeId && activePage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-2xl w-full md:max-w-lg shadow-2xl max-h-[92vh] flex flex-col">

            <div className="flex items-center justify-between p-5 border-b shrink-0">
              <div>
                <h2 className="font-bold text-[#1a1f5e] text-lg">{activePage.page}</h2>
                <p className="text-gray-400 text-xs mt-0.5">{activePage.desc}</p>
              </div>
              <button onClick={() => setActiveId(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {saved ? (
              <div className="p-16 text-center">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="mx-auto mb-4">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p className="font-bold text-[#1a1f5e] text-lg">Saved Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="overflow-y-auto flex-1 p-5 space-y-4">
                {activePage.fields.map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        value={formData[field.key] || ''}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field.key] || ''}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-2 pb-2">
                  <button type="button" onClick={() => setActiveId(null)}
                    className="flex-1 border border-gray-200 rounded-xl py-3 text-sm text-gray-600 hover:bg-gray-50 font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-[#1a1f5e] text-white rounded-xl py-3 text-sm font-bold hover:bg-blue-900 flex items-center justify-center gap-2 disabled:opacity-60">
                    {saving ? (
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
