import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, MapPin, Clock } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface FilterOption {
  value: string;
  label: string;
}

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const { helpRequests, fetchHelpRequests, isLoading } = useAppStore();
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories: FilterOption[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'devops', label: 'DevOps' },
    { value: 'mobile', label: 'Mobile Dev' },
    { value: 'web', label: 'Web Dev' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'other', label: 'Other' }
  ];

  const urgencies: FilterOption[] = [
    { value: 'all', label: 'All Urgency' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const statuses: FilterOption[] = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'solved', label: 'Solved' },
    { value: 'closed', label: 'Closed' }
  ];

  useEffect(() => {
    fetchHelpRequests({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      urgency: selectedUrgency === 'all' ? undefined : selectedUrgency,
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      searchTerm: searchTerm || undefined,
    });
  }, [selectedCategory, selectedUrgency, selectedStatus, searchTerm, fetchHelpRequests]);

  useEffect(() => {
    if (!isLoading && helpRequests.length > 0 && cardsRef.current.some(Boolean)) {
      gsap.fromTo(
        cardsRef.current.filter(Boolean) as HTMLDivElement[],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(0.4)",
        }
      );
    }
  }, [helpRequests, isLoading]);

  useEffect(() => {
    gsap.fromTo('.filter-section', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
  }, []);

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'badge-danger';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return 'badge-success';
      case 'in-progress': return 'badge-warning';
      case 'solved': return 'badge-primary';
      case 'closed': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  };

  const handleCardClick = (requestId: string) => {
    navigate(`/request/${requestId}`);
  };

  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <div className="card filter-section">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
          Explore Help Requests
        </h1>
        <p className="text-xl text-neutral-500 mb-8">Find help or offer assistance to others</p>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title, tags, or description..."
            className="input-base pl-12 pr-4 py-4 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-neutral-300">
              <Filter size={18} />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
              className="input-base py-4"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-neutral-300">Urgency</label>
            <select
              value={selectedUrgency}
              onChange={(e) => handleFilterChange(setSelectedUrgency, e.target.value)}
              className="input-base py-4"
            >
              {urgencies.map((urg) => (
                <option key={urg.value} value={urg.value}>
                  {urg.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-neutral-300">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => handleFilterChange(setSelectedStatus, e.target.value)}
              className="input-base py-4"
            >
              {statuses.map((stat) => (
                <option key={stat.value} value={stat.value}>
                  {stat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-bold text-xl">{helpRequests.length} requests found</span>
        <div className="flex gap-2 text-sm">
          <span className="badge-primary px-3 py-1">{selectedCategory}</span>
          <span className="badge-success px-3 py-1">{selectedUrgency}</span>
          <span className="badge-neutral px-3 py-1">{selectedStatus}</span>
        </div>
      </div>

      {/* Requests Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, idx) => (
            <div key={idx} className="card animate-pulse">
              <div className="h-6 bg-neutral-800 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-neutral-800 rounded mb-2 w-full"></div>
              <div className="h-4 bg-neutral-800 rounded w-2/3 mb-6"></div>
              <div className="flex gap-2 mb-6">
                <div className="h-6 bg-neutral-800 rounded-full w-20"></div>
                <div className="h-6 bg-neutral-800 rounded-full w-16"></div>
              </div>
              <div className="h-10 bg-neutral-800 rounded-full w-full"></div>
            </div>
          ))}
        </div>
      ) : helpRequests.length === 0 ? (
        <div className="text-center py-20 col-span-full">
          <Search size={64} className="mx-auto text-neutral-500 mb-6" />
          <h3 className="text-2xl font-bold text-neutral-400 mb-4">No requests found</h3>
          <p className="text-neutral-500 mb-8 max-w-md mx-auto">
            Try adjusting your filters or create the first help request in this category!
          </p>
          <button className="btn-primary px-8 py-3" onClick={() => navigate('/create-request')}>
            Create Request
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpRequests.map((request, idx) => (
            <div
              key={request.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              data-id={request.id}
              className="card-hover transform-gpu"
              onClick={() => handleCardClick(request.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold line-clamp-2 flex-1 pr-2">{request.title}</h3>
                <div className="flex flex-col gap-1">
                  <span className={`badge text-xs px-2 py-1 ${getUrgencyBadge(request.urgency)}`}>
                    {request.urgency.toUpperCase()}
                  </span>
                  <span className={`badge text-xs px-2 py-1 ${getStatusBadge(request.status)}`}>
                    {request.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              <p className="text-neutral-400 mb-4 line-clamp-3 leading-relaxed">{request.description}</p>
              <div className="flex gap-2 flex-wrap mb-6">
                {request.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="badge-primary text-xs px-3 py-1">{tag}</span>
                ))}
                {request.tags.length > 4 && (
                  <span className="text-xs text-neutral-500 px-3 py-1 bg-neutral-900 rounded-full">
                    +{request.tags.length - 4}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-neutral-500 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{request.location || 'Remote'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <button className="btn-secondary w-full hover:scale-[1.02] transition-transform">
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;

