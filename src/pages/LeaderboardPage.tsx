import React from 'react';
import { Trophy, Star, Users, Crown } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const leaderboardData = [
    { rank: 1, name: 'Alice Johnson', score: 1250, helped: 89, solved: 67 },
    { rank: 2, name: 'Bob Smith', score: 1180, helped: 76, solved: 58 },
    { rank: 3, name: 'Carol Davis', score: 1095, helped: 64, solved: 52 },
    { rank: 4, name: 'David Wilson', score: 987, helped: 58, solved: 47 },
    { rank: 5, name: 'Eve Brown', score: 923, helped: 51, solved: 43 },
  ];

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <Crown size={32} className="text-yellow-400" />
          <div>
            <h1 className="text-4xl font-bold">Leaderboard</h1>
            <p className="text-neutral-600">Top community helpers</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900/50">
              <th className="p-4 text-left font-bold">Rank</th>
              <th className="p-4 text-left font-bold">Helper</th>
              <th className="p-4 text-left font-bold">Trust Score</th>
              <th className="p-4 text-left font-bold">Helped</th>
              <th className="p-4 text-left font-bold">Solved</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                <td className="p-4 font-bold text-2xl">
                  {user.rank === 1 && <span className="text-yellow-400">🥇</span>}
                  {user.rank === 2 && <span className="text-gray-400">🥈</span>}
                  {user.rank === 3 && <span className="text-orange-500">🥉</span>}
                  {user.rank > 3 && `#${user.rank}`}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-neutral-500">Active 2h ago</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-lg">{user.score}</span>
                  </div>
                </td>
                <td className="p-4 font-bold text-primary-400">{user.helped}</td>
                <td className="p-4 font-bold text-success">{user.solved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center p-8">
          <Users size={48} className="mx-auto text-primary-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Join Top 100</h3>
          <p className="text-neutral-600 mb-4">Your current rank: #247</p>
          <button className="btn-primary w-full">View My Stats</button>
        </div>
        <div className="card text-center p-8">
          <Trophy size={48} className="mx-auto text-yellow-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Weekly Contest</h3>
          <p className="text-neutral-600 mb-4">Top 10 win badges</p>
          <button className="btn-secondary w-full">Participate</button>
        </div>
        <div className="card text-center p-8">
          <Star size={48} className="mx-auto text-orange-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Trust Badges</h3>
          <p className="text-neutral-600 mb-4">Earn badges for milestones</p>
          <button className="btn-ghost w-full">View Badges</button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;

