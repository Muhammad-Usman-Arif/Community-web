import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { getSkillSuggestions, getInterestSuggestions } from '../utils/aiService';
import { MapPin, Lightbulb, Zap } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    skills: [] as string[],
    interests: [] as string[],
    location: '',
    role: 'both' as 'need-help' | 'can-help' | 'both',
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleComplete = () => {
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: 'user@example.com',
      role: formData.role,
      skills: formData.skills,
      interests: formData.interests,
      location: formData.location,
      trustScore: 0,
      helpCount: 0,
      solvedCount: 0,
      badges: [],
      createdAt: new Date(),
    };
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/dashboard');
  };

  const skillSuggestions = getSkillSuggestions(formData.skills);
  const interestSuggestions = getInterestSuggestions(formData.interests);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4">
      <div className="container-main max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12 mt-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 mx-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary-600' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-neutral-600">Step {step} of 4</p>
        </div>

        <div className="card">
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Welcome! Let's get started</h2>
              <p className="text-neutral-600 mb-8">Tell us your name and how you'd like to participate</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">What's your role?</label>
                  <div className="space-y-2">
                    {[
                      { value: 'need-help', label: 'I need help learning', icon: '📚' },
                      { value: 'can-help', label: 'I can help others', icon: '🤝' },
                      { value: 'both', label: 'Both - I learn and help', icon: '🚀' },
                    ].map((role) => (
                      <label key={role.value} className="flex items-center p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-primary-50">
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={formData.role === role.value}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                          className="mr-3"
                        />
                        <span className="text-lg mr-2">{role.icon}</span>
                        <span className="font-medium">{role.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb size={28} className="text-primary-600" />
                Your Skills
              </h2>
              <p className="text-neutral-600 mb-6">What are you good at?</p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  {formData.skills.map((skill) => (
                    <div key={skill} className="badge-primary">
                      {skill}
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          skills: formData.skills.filter(s => s !== skill),
                        })}
                        className="ml-1 hover:text-primary-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Suggested Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions.slice(0, 6).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => setFormData({
                          ...formData,
                          skills: [...formData.skills, skill],
                        })}
                        className="px-3 py-1 rounded-full border border-primary-300 hover:bg-primary-50 text-sm"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Zap size={28} className="text-accent-600" />
                Your Interests
              </h2>
              <p className="text-neutral-600 mb-6">What are you passionate about?</p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-6">
                  {formData.interests.map((interest) => (
                    <div key={interest} className="badge-success">
                      {interest}
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          interests: formData.interests.filter(i => i !== interest),
                        })}
                        className="ml-1 hover:text-green-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Suggested Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {interestSuggestions.slice(0, 5).map((interest) => (
                      <button
                        key={interest}
                        onClick={() => setFormData({
                          ...formData,
                          interests: [...formData.interests, interest],
                        })}
                        className="px-3 py-1 rounded-full border border-green-300 hover:bg-green-50 text-sm"
                      >
                        + {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <MapPin size={28} className="text-warning" />
                Your Location
              </h2>
              <p className="text-neutral-600 mb-8">This helps us match you with local helpers</p>

              <div>
                <label className="block text-sm font-medium mb-2">City / Region</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                  className="input-base"
                />
              </div>

              <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <h3 className="font-bold mb-2">Ready to join?</h3>
                <p className="text-neutral-700">
                  You're all set! Let's get you connected with the community.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary flex-1"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary flex-1"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="btn-primary flex-1"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
