'use client'
import { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Upload, Image as ImageIcon } from 'lucide-react'

export default function MediaPage() {
  const [dragging, setDragging] = useState(false)

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Media Library</h1>
        <p className="text-gray-500 text-sm">Upload and manage images and documents</p>
      </div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false) }}
        className={`border-2 border-dashed rounded-2xl p-16 text-center transition-colors duration-200 mb-8
          ${dragging ? 'border-[#0ea5e9] bg-blue-50' : 'border-gray-200 bg-white'}`}>
        <Upload size={40} className="text-gray-300 mx-auto mb-4" />
        <p className="font-medium text-[#1a1f5e] mb-1">Drag and drop files here</p>
        <p className="text-gray-400 text-sm mb-4">Supports JPG, PNG, PDF up to 10MB</p>
        <label className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm cursor-pointer">
          <Upload size={14} /> Browse Files
          <input type="file" className="hidden" multiple accept="image/*,.pdf" />
        </label>
      </div>
      <div className="card p-8 text-center">
        <ImageIcon size={40} className="text-gray-300 mx-auto mb-3" />
        <p className="text-gray-400">No media uploaded yet.</p>
      </div>
    </AdminLayout>
  )
}
