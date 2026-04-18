import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { useAuth } from '../hooks/useAuth';
import { Tag, MapPin, Send, X } from 'lucide-react';

const CreateRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'programming',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    tags: [] as string[],
    location: '',
    createdBy: '',
    status: 'open' as const,
    helpers: [] as any[],
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories] = useState([
    'programming', 'web', 'mobile', 'design', 'data-science', 'ai-ml', 
    'devops', 'testing', 'database', 'other'
  ]);
  const [success, setSuccess] = useState(false);

  const { createHelpRequest } = useAppStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, createdBy: user.id }));
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createHelpRequest({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        urgency: formData.urgency,
        location: formData.location || undefined,
        createdBy: formData.createdBy,
        status: formData.status,
        helpers: formData.helpers,
      });
      setSuccess(true);
      setTimeout(() => navigate('/explore'), 2000);
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (e?: React.KeyboardEvent) => {
    if (e && e.key !== 'Enter') return;
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed) && formData.tags.length < 8) {
      setFormData({ ...formData, tags: [...formData.tags, trimmed] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  if (success) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-16">
        <div className="w-24 h-24 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Send className="text-green-500 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Request Posted Successfully!</h1>
        <p className="text-lg text-neutral-400 mb-8">Your help request is now live. Helpers will be notified.</p>
        <div className="flex gap-4 justify-center">
          <button className="btn-primary px-8" onClick={() => navigate('/explore')}>
            View Requests
          </button>
          <button className="btn-ghost px-8" onClick={() => navigate('/dashboard')}>
            Go Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto pt-12 px-4">
        <div className="card p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Post Your Help Request
              </h1>
              <p className="text-lg text-neutral-500 mt-1">Get expert help fast - community notified instantly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-neutral-300">
                Request Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Need help debugging React useEffect infinite loop"
                className="input-base text-lg py-5 px-6 focus:ring-4 focus:ring-primary-500/20"
                maxLength={100}
                required
              />
              <p className="text-xs text-neutral-500 mt-1">{formData.title.length}/100</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-neutral-300">
                Detailed Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your problem, what you've tried, code snippets, error messages..."
                className="input-base min-h-[180px] py-5 px-6 resize-vertical focus:ring-4 focus:ring-primary-500/20"
                rows={6}
                required
              />
            </div>

            {/* Category & Urgency */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-neutral-300">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-base py-5 px-6"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-neutral-300">Urgency</label>
                <div className="space-y-2">
                  {(['low', 'medium', 'high'] as const).map(urgency => (
                    <label key={urgency} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-neutral-800 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={urgency}
                        checked={formData.urgency === urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value as typeof urgency })}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="font-medium capitalize">{urgency}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Location & Tags */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-neutral-300">
                  <MapPin size={18} />
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Remote, London, NYC..."
                  className="input-base py-5 px-6"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-neutral-300">
                  <Tag size={18} />
                  Tags (click to remove)
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag(e)}
                      placeholder="react, typescript, bug"
                      className="input-base flex-1 py-4 px-4"
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={() => addTag()}
                      className="btn-primary px-6 py-4 whitespace-nowrap"
                    >
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.tags.map((tag, idx) => (
                      <div
                        key={idx}
                        className="badge-primary inline-flex items-center gap-1 px-3 py-2 text-sm cursor-pointer hover:bg-red-500/20 hover:text-red-400 transition-all group"
                        onClick={() => removeTag(tag)}
                      >
                        <span>{tag}</span>
                        <X size={14} className="group-hover:ml-1 transition-all" />
                      </div>
                    ))}
                    {formData.tags.length === 0 && (
                      <p className="text-xs text-neutral-500 italic">Add tags to help match with experts</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="btn-ghost flex-1 py-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description}
                className="btn-primary flex-1 py-4 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Posting...
                  </>
                ) : (
                  'Post Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestPage;

