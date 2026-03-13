import AdminLayout from '@/components/layout/AdminLayout'

export default function MembersPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Members</h1>
        <p className="text-gray-500 text-sm">Manage all member registrations</p>
      </div>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <input type="text" placeholder="Search members..."
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
          <button className="btn-primary !py-2 !px-5 !text-sm !bg-[#1a1f5e] hover:!bg-blue-900">+ Add Member</button>
        </div>
        <div className="text-center py-12 text-gray-400">
          <p>No members yet. Connect your backend API.</p>
        </div>
      </div>
    </AdminLayout>
  )
}
