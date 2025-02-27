// app/admin/dashboard/layout.jsx
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/hooks/useAuth';
import { 
  Users, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export default function AdminDashboardLayout() {
  const { user, loading, logout } = useAuth([ROLES.ADMIN]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-400 rounded-lg lg:hidden hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <ul className="space-y-2">
            <li>
              <a href="/admin/dashboard" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/users" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                <Users className="w-5 h-5 mr-2" />
                Users
              </a>
            </li>
            <li>
              <a href="/admin/settings" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </a>
            </li>
            <li>
              <button 
                onClick={logout}
                className="flex items-center w-full p-2 text-white rounded-lg hover:bg-gray-700"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top bar */}
        <div className="mb-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Welcome, {user?.firstName}</span>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-2 text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">2,345</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-2 text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold">1,892</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-2 text-lg font-semibold">New Users (Today)</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="mt-4 bg-white rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Recent Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">john@example.com</td>
                  <td className="px-6 py-4">User</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}