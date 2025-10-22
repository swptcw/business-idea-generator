import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export default function BusinessIdeaGenerator() {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skill: '',
    experience: '',
    interests: '',
    time: '',
    monetization: '',
    income: '',
    tone: ''
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateIdeas = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate ideas');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
      setStep('results');
    } catch (err) {
      setError(err.message || 'Unable to generate ideas. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-purple-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">Your Personalized Business Ideas</h1>
            </div>
            
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {generatedContent}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setStep('form');
                  setGeneratedContent('');
                }}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Generate New Ideas
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-purple-600" size={36} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Business Idea Generator</h1>
              <p className="text-gray-600">Transform your skills into profitable ventures</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Primary Skill / Background *
              </label>
              <input
                type="text"
                placeholder="e.g., Sales, Design, Teaching, Marketing"
                value={formData.skill}
                onChange={(e) => handleInputChange('skill', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience Level *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select your level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interests or Passions *
              </label>
              <input
                type="text"
                placeholder="e.g., fitness, AI, productivity, travel"
                value={formData.interests}
                onChange={(e) => handleInputChange('interests', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Available Time *
              </label>
              <input
                type="text"
                placeholder="e.g., 5 hrs/week, 10 hrs/week, full-time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monetization Type *
              </label>
              <select
                value={formData.monetization}
                onChange={(e) => handleInputChange('monetization', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select a type</option>
                <option value="service">Service</option>
                <option value="digital product">Digital Product</option>
                <option value="community">Community</option>
                <option value="course">Course</option>
                <option value="agency">Agency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Income Goal *
              </label>
              <input
                type="text"
                placeholder="e.g., $1K/month, $5K/month, full-time replacement"
                value={formData.income}
                onChange={(e) => handleInputChange('income', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tone & Style *
              </label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select a tone</option>
                <option value="inspiring">Inspiring</option>
                <option value="direct">Direct</option>
                <option value="step-by-step">Step-by-Step</option>
              </select>
            </div>

            <button
              onClick={generateIdeas}
              disabled={!isFormValid() || loading}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all flex items-center justify-center gap-2 ${
                isFormValid() && !loading
                  ? 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Generating Your Ideas...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Generate My Business Ideas
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
