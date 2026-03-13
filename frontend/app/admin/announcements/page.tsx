import AdminLayout from '@/components/layout/AdminLayout'

export default function AnnouncementsPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Announcements</h1>
        <p className="text-gray-500 text-sm">Post and manage announcements</p>
      </div>
      <div className="card p-6">
        <div className="flex justify-end mb-6">
          <button className="btn-primary !py-2 !px-5 !text-sm !bg-[#1a1f5e] hover:!bg-blue-900">+ New Announcement</button>
        </div>
        <div className="text-center py-12 text-gray-400">
          <p>No announcements yet.</p>
        </div>
      </div>
    </AdminLayout>
  )
}
