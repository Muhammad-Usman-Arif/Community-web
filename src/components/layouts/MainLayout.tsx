import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Home, Compass, Plus, MessageSquare, Trophy, Brain, Bell, User, LogOut, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useAppStore } from '../../store/appStore';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { currentUser } = useAppStore();

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 24 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/create-request', icon: Plus, label: 'Create Request' },
    { path: '/messaging', icon: MessageSquare, label: 'Messaging' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/ai-center', icon: Brain, label: 'AI Center' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: currentUser ? `/profile/${currentUser.id}` : '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } bg-[#111111] text-white p-5 transition-all duration-300 overflow-y-auto shadow-[0_30px_80px_rgba(0,0,0,0.35)]`}
      >
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && <h1 className="text-3xl font-bold tracking-tight">Helpytics</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/15 rounded-2xl"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-3xl transition-colors text-left ${
                  isActive ? 'bg-white/20 text-white' : 'hover:bg-white/15 text-white'
                }`
              }
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div ref={contentRef} className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
