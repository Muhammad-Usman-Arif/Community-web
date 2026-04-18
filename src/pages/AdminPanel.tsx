import React, { useState } from 'react';
import { BarChart3, Users, AlertCircle, Trash2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'users' | 'content'>('overview');

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={28} />
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>
        <p className="text-primary-100">Manage platform and monitor community</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'requests', label: 'Requests', icon: AlertCircle },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'content', label: 'Content', icon: Trash2 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: '10,200', change: '+12%' },
            { label: 'Active Requests', value: '1,240', change: '+8%' },
            { label: 'Avg. Resolution Time', value: '2.3h', change: '-5%' },
            { label: 'Platform Health', value: '98.5%', change: '+2%' },
          ].map((stat, idx) => (
            <div key={idx} className="card">
              <p className="text-neutral-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-green-600 text-sm font-medium">{stat.change}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="card overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Manage Help Requests</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left p-3 font-bold">Request</th>
                <th className="text-left p-3 font-bold">Status</th>
                <th className="text-left p-3 font-bold">Reports</th>
                <th className="text-left p-3 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((idx) => (
                <tr key={idx} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="p-3">Request {idx}</td>
                  <td className="p-3"><span className="badge-success">Active</span></td>
                  <td className="p-3">0</td>
                  <td className="p-3"><button className="text-primary-600 hover:underline">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                <div>
                  <p className="font-medium">User {idx}</p>
                  <p className="text-sm text-neutral-600">user{idx}@example.com</p>
                </div>
                <button className="btn-danger text-xs py-1 px-2">Suspend</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Content Moderation</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg">
                <div>
                  <p className="font-medium">Flagged Content {idx}</p>
                  <p className="text-sm text-neutral-600">Reported as inappropriate</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs py-1 px-2">Approve</button>
                  <button className="btn-danger text-xs py-1 px-2">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
