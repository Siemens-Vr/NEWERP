// app/admin/dashboard/index.jsx
"use client";

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/hooks/useAuth';
import axios from 'axios';

export default function AdminDashboard() {
  const { user, loading } = useAuth([ROLES.ADMIN]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch statistics
        const statsResponse = await axios.get('http://localhost:10600/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsResponse.data);

        // Fetch recent users
        const usersResponse = await axios.get('http://localhost:10600/api/admin/recent-users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecentUsers(usersResponse.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUserStatusChange = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:10600/api/admin/users/${userId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh user list
      const usersResponse = await axios.get('http://localhost:10600/api/admin/recent-users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentUsers(usersResponse.data);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Active Users</h2>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">New Users Today</h2>
          <p className="text-3xl font-bold">{stats.newUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.uuid} className="border-b">
                    <td className="py-3">{user.firstName} {user.lastName}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">{user.role}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3">
                      <button 
                        onClick={() => handleUserStatusChange(user.uuid, !user.isActive)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}