import AdminLayout from '@/components/layout/AdminLayout'
import { Users, Bell, FileText, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users,      label: 'Total Members',       value: '0', color: 'bg-blue-100 text-[#0ea5e9]' },
  { icon: TrendingUp, label: 'New This Month',       value: '0', color: 'bg-green-100 text-[#22c55e]' },
  { icon: Bell,       label: 'Announcements',        value: '0', color: 'bg-pink-100 text-[#ec4899]' },
  { icon: FileText,   label: 'Pending Applications', value: '0', color: 'bg-purple-100 text-purple-500' },
]

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1f5e]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={18} />
            </div>
            <p className="text-2xl font-bold text-[#1a1f5e]">{value}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="card p-8 text-center text-gray-400">
        <p>Connect your backend API to display live data here.</p>
      </div>
    </AdminLayout>
  )
}
