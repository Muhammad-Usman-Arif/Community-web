import React from 'react';
import { Brain, Zap, Lightbulb, Bot, Code } from 'lucide-react';

const AICenterPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Request Analyzer',
      description: 'Automatically categorizes and prioritizes help requests',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Zap,
      title: 'Smart Matching',
      description: 'Connects helpers and learners based on skills and availability',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Lightbulb,
      title: 'Solution Generator',
      description: 'AI-powered code snippets and solutions for common problems',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Bot,
      title: 'Chat Assistant',
      description: '24/7 AI helper for quick questions and guidance',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full mb-6">
          <Brain size={20} />
          <span>AI POWERED COMMUNITY</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
          AI Center
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Advanced AI features that make learning and helping smarter, faster, and more effective
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="group card p-8 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 w-fit mx-auto group-hover:scale-110 transition-all duration-300`}>
                <Icon size={40} className="drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gray-200">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
        <div>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">10k+</div>
          <p className="text-neutral-600">Requests Analyzed</p>
        </div>
        <div>
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">95%</div>
          <p className="text-neutral-600">Match Accuracy</p>
        </div>
        <div>
          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">2.3s</div>
          <p className="text-neutral-600">Avg Response Time</p>
        </div>
        <div>
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">24/7</div>
          <p className="text-neutral-600">AI Assistant</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="btn-primary text-xl px-12 py-6">
          Start Using AI Features
        </button>
      </div>
    </div>
  );
};

export default AICenterPage;

