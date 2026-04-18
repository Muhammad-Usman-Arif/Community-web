import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { currentUser, helpRequests, fetchHelpRequests } = useAppStore();

  useEffect(() => {
    fetchHelpRequests();
  }, [fetchHelpRequests]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = '1';
      wrapperRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  const myRequests = helpRequests.filter(req => req.createdBy === currentUser?.id);
  const recentRequests = myRequests.slice(0, 3);

  const stats = [
    { label: 'Help Requests', value: myRequests.length, icon: Heart, color: 'primary' },
    { label: 'Solved', value: myRequests.filter(req => req.status === 'solved').length, icon: TrendingUp, color: 'success' },
    { label: 'Trust Score', value: currentUser?.trustScore || 0, icon: BarChart3, color: 'accent' },
    { label: 'Helpers Connected', value: myRequests.reduce((acc, req) => acc + req.helpers.length, 0), icon: Users, color: 'warning' },
  ];

  return (
    <div ref={wrapperRef} className="space-y-8">
      {/* Welcome Card */}
      <div className="card bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
          <p className="text-primary-100">You're making a real difference in the community</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClass = stat.color === 'primary' ? 'bg-primary-100 text-primary-600' : 
                           stat.color === 'success' ? 'bg-success/10 text-success' :
                           stat.color === 'accent' ? 'bg-accent-100 text-accent-600' : 
                           'bg-warning/10 text-warning';
          return (
            <div key={idx} className="card">
              <div className={`p-3 ${colorClass} rounded-lg w-fit mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );

        })}
      </div>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Your Recent Requests</h2>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer"
                onClick={() => navigate(`/request/${request.id}`)}
              >
                <p className="font-medium mb-1">{request.title}</p>
                <p className="text-neutral-600 text-sm">{request.description.slice(0, 100)}...</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`badge ${request.status === 'open' ? 'badge-success' : request.status === 'in-progress' ? 'badge-warning' : 'badge-primary'} text-xs`}>
                    {request.status}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {recentRequests.length === 0 && (
              <p className="text-neutral-500 text-center py-4">No requests yet. Create your first one!</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button onClick={() => navigate('/create-request')} className="btn-primary w-full">Create New Request</button>
            <button onClick={() => navigate('/explore')} className="btn-secondary w-full">Browse Requests</button>
            <button onClick={() => navigate('/messaging')} className="btn-ghost w-full">View Messages</button>
            <button onClick={() => navigate('/notifications')} className="btn-ghost w-full">View Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
