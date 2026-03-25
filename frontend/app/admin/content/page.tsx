'use client'
import React, { useState, useRef } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const pages = [
  {
    id: 'home',
    page: 'Home Page',
    desc: 'Hero text, About preview, CTA section',
    fields: [
      { key: 'hero_title',    label: 'Hero Title',      type: 'text',     def: 'Protecting Families, Preserving Dignity' },
      { key: 'hero_subtitle', label: 'Hero Subtitle',   type: 'textarea', def: 'Mbelee Maisha supports members through medical emergencies, last expense coverage, and children\'s education savings — ensuring every family faces unforeseen events with strength and dignity.' },
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
  const [activeId, setActiveId]     = useState<string | null>(null)
  const [formData, setFormData]     = useState<Record<string, string>>({})
  const [saving, setSaving]         = useState(false)
  const [saved, setSaved]           = useState(false)
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)

  // Terms & conditions upload state
  const [termsUrl, setTermsUrl]     = useState<string | null>(null)
  const [uploading, setUploading]   = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadOk, setUploadOk]     = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    // Load current terms URL from API on mount
    const token = localStorage.getItem('adminToken')
    fetch(`${API_URL}/api/content`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r => r.json())
      .then(data => { if (data.terms_pdf_url) setTermsUrl(data.terms_pdf_url) })
      .catch(() => {})
  }, [])

  const openModal = async (id: string) => {
    const p = pages.find(x => x.id === id)
    if (!p) return
    setLoading(true)
    setError('')
    setSaved(false)
    setActiveId(id)

    // Build defaults first
    const d: Record<string, string> = {}
    p.fields.forEach(f => { d[f.key] = f.def })

    try {
      const res = await fetch(`${API_URL}/api/content`)
      if (res.ok) {
        const data = await res.json()
        p.fields.forEach(f => {
          if (data[f.key] !== undefined) d[f.key] = data[f.key]
        })
      }
    } catch {}

    setFormData(d)
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      setTimeout(() => { setSaved(false); setActiveId(null) }, 1500)
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleTermsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    setUploadOk(false)
    try {
      const token = localStorage.getItem('adminToken')
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(`${API_URL}/api/upload/terms`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setTermsUrl(data.url)
      setUploadOk(true)
      setTimeout(() => setUploadOk(false), 3000)
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleRemoveTerms = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`${API_URL}/api/upload/terms`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setTermsUrl(null)
    } catch {}
  }

  const activePage = pages.find(x => x.id === activeId)

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Content Management</h1>
        <p className="text-gray-500 text-sm">Manage website text and page content</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
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

      {/* Terms & Conditions PDF */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1a1f5e] mb-1">Terms &amp; Conditions (PDF)</h3>
            <p className="text-gray-500 text-sm mb-4">Upload a PDF that members can download from the Membership page.</p>

            {termsUrl && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-green-700 text-sm flex-1">T&amp;C PDF is live</span>
                <a
                  href={`${API_URL}/api/upload/terms`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#0ea5e9] font-semibold hover:underline"
                >
                  Preview
                </a>
                <button
                  onClick={handleRemoveTerms}
                  className="text-xs text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            {uploadError && (
              <p className="text-red-500 text-sm mb-3">{uploadError}</p>
            )}
            {uploadOk && (
              <p className="text-green-600 text-sm mb-3">Uploaded successfully!</p>
            )}

            <label className="inline-flex items-center gap-2 cursor-pointer bg-[#1a1f5e] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-900 transition-colors">
              {uploading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Uploading…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {termsUrl ? 'Replace PDF' : 'Upload PDF'}
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleTermsUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
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

            {loading ? (
              <div className="p-16 text-center">
                <svg className="animate-spin mx-auto" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a1f5e" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              </div>
            ) : saved ? (
              <div className="p-16 text-center">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="mx-auto mb-4">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p className="font-bold text-[#1a1f5e] text-lg">Saved Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="overflow-y-auto flex-1 p-5 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
                )}
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
