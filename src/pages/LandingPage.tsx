import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Lightbulb, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
      });
    }
    if (featureRef.current) {
      gsap.from(featureRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
      </div>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
        <div className="container-main flex items-center justify-between h-16">
          <div className="font-bold text-2xl text-white">Helpytics</div>
          <button
            onClick={() => navigate('/auth')}
            className="btn-secondary"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-spacing">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={heroRef} className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-900/80 text-slate-100 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-xl shadow-slate-900/20">
                ✨ Premium AI Community Experience
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gradient">
                Connect. Learn. Grow. Together.
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Helpytics AI connects people who need help with experts who can provide it. Build your skills, earn trust, and grow your impact in a supportive community.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/auth')}
                  className="btn-primary flex items-center gap-2 text-lg px-6 py-3"
                >
                  Start Helping <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="btn-secondary flex items-center gap-2 text-lg px-6 py-3"
                >
                  Get Help <Lightbulb size={20} />
                </button>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary-500 to-accent-500 rounded-[38px] shadow-2xl flex items-center justify-center text-white overflow-hidden">
              <div className="absolute inset-x-0 top-10 h-24 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-8 top-16 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
              <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
              <div className="relative text-center z-10">
                <Users size={80} />
                <p className="mt-4 text-xl font-semibold">Join 10,000+ Helpers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing bg-white">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Helpytics?</h2>
          <div ref={featureRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-primary-600" size={32} />,
                title: 'AI-Powered Matching',
                desc: 'Smart algorithms connect you with the perfect helper or learner',
              },
              {
                icon: <Users className="text-accent-600" size={32} />,
                title: 'Trusted Community',
                desc: 'Build your reputation with trust scores and achievement badges',
              },
              {
                icon: <Lightbulb className="text-warning" size={32} />,
                title: 'Real Learning',
                desc: 'Learn from real experts solving real problems',
              },
            ].map((feature, idx) => (
              <div key={idx} className="card hover:shadow-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Active Helpers' },
              { value: '50,000+', label: 'Requests Solved' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '200+', label: 'Categories' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-primary-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-main text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to learn or help others, Helpytics is the platform for you.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Join Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-2xl mb-4">Helpytics</div>
              <p className="text-neutral-400">Connecting learners with experts</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-700 pt-8 text-center text-neutral-400">
            <p>&copy; 2026 Helpytics AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
