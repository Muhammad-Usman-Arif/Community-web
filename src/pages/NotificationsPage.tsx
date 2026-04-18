import React from 'react';
import { Bell, CheckCircle, MessageSquare, UserCheck, Award, Filter } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const notifications = [
    { id: '1', title: 'New message from Alice', type: 'message', time: '2 min ago', read: false },
    { id: '2', title: 'Your request got a helper!', type: 'helper', time: '5 min ago', read: true },
    { id: '3', title: 'Request #123 marked solved', type: 'solved', time: '1 hr ago', read: false },
    { id: '4', title: 'You earned "Quick Helper" badge', type: 'badge', time: '2 hrs ago', read: false },
    { id: '5', title: 'New request in your category', type: 'request', time: '4 hrs ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={32} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-neutral-600">{unreadCount} unread</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost p-2">
            <Filter size={18} />
          </button>
          <button className="btn-secondary">
            Mark All Read
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="divide-y divide-neutral-800">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-4 hover:bg-neutral-900/50 transition-colors ${
              !notif.read ? 'bg-primary-500/10 border-l-4 border-primary-500' : ''
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  notif.type === 'message' ? 'bg-blue-500/20 text-blue-400' :
                  notif.type === 'helper' ? 'bg-green-500/20 text-green-400' :
                  notif.type === 'solved' ? 'bg-emerald-500/20 text-emerald-400' :
                  notif.type === 'badge' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-primary-500/20 text-primary-400'
                }`}>
                  {notif.type === 'message' && <MessageSquare size={20} />}
                  {notif.type === 'helper' && <UserCheck size={20} />}
                  {notif.type === 'solved' && <CheckCircle size={20} />}
                  {notif.type === 'badge' && <Award size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold mb-1 ${!notif.read ? 'text-white' : 'text-neutral-300'}`}>
                    {notif.title}
                  </p>
                  <p className="text-sm text-neutral-500">Click to view</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 ml-auto">
                  <span>{notif.time}</span>
                  {!notif.read && <span className="w-2 h-2 bg-primary-400 rounded-full"></span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {notifications.length === 0 && (
        <div className="card text-center p-12">
          <Bell size={64} className="mx-auto text-neutral-500 mb-4" />
          <h3 className="text-xl font-bold text-neutral-300 mb-2">No notifications</h3>
          <p className="text-neutral-500">You'll see updates here</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

