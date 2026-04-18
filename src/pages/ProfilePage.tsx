import React from 'react';
import { Award, MapPin, Edit2, Star, Users, Lightbulb } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-accent-500 to-purple-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-start justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-full border-4 border-white/30 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center font-bold text-2xl">
                  JD
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 border-4 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">John Developer</h1>
              <p className="text-xl text-primary-100 mb-1 flex items-center gap-1">
                <MapPin size={20} /> San Francisco, CA
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
          <button className="btn-secondary px-6 py-3 whitespace-nowrap">
            <Edit2 size={20} className="mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 mb-6">About Me</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Senior Full Stack Developer with 7+ years experience. Specializing in React, Node.js, and cloud architecture. 
              Passionate about mentoring and open source contributions. Currently helping 50+ developers weekly.
            </p>
          </div>

          {/* Skills */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb size={24} /> Top Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Tailwind', 'Next.js'].map((skill) => (
                <div key={skill} className="group p-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-200/50 hover:bg-primary-500/20 transition-all cursor-pointer">
                  <p className="font-semibold group-hover:text-primary-400">{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center p-8">
              <Users size={48} className="mx-auto text-primary-600 mb-4" />
              <p className="text-3xl font-bold text-primary-600">247</p>
              <p className="text-neutral-600 mt-1">People Helped</p>
            </div>
            <div className="card text-center p-8">
              <Award size={48} className="mx-auto text-yellow-500 mb-4" />
              <p className="text-3xl font-bold text-yellow-500">12</p>
              <p className="text-neutral-600 mt-1">Badges Earned</p>
            </div>
            <div className="card text-center p-8">
              <Star size={48} className="mx-auto text-emerald-500 mb-4" />
              <p className="text-3xl font-bold text-emerald-500">4.9</p>
              <p className="text-neutral-600 mt-1">Trust Score</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Requests */}
          <div className="card p-6">
            <h3 className="font-bold mb-4">Recent Requests</h3>
            <div className="space-y-3">
              {['React Performance', 'Docker Deployment', 'TypeScript Advanced'].map((req, idx) => (
                <div key={idx} className="p-3 bg-primary-50/50 rounded-lg border-l-4 border-primary-400">
                  <p className="font-medium">{req}</p>
                  <p className="text-sm text-neutral-600">3 helpers · 2h ago</p>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              Badges <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full font-medium">12</span>
            </h3>
            <div className="space-y-2">
              {['Quick Responder', 'Helpful Mentor', 'Tech Expert', 'Trusted Guide'].map((badge) => (
                <div key={badge} className="flex items-center gap-3 p-3 bg-yellow-50/50 rounded-lg border border-yellow-200/50">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    #{badge.charAt(0)}
                  </div>
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

