import React, { useState } from 'react';
import { X, MessageSquare, FileText, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const NewQuestionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Travel', icon: '🌍' },
    { value: 'destinations', label: 'Destinations', icon: '📍' },
    { value: 'budget', label: 'Budget Travel', icon: '💰' },
    { value: 'solo', label: 'Solo Travel', icon: '🎒' },
    { value: 'tips', label: 'Tips & Hacks', icon: '💡' },
    { value: 'accommodation', label: 'Hotels & Stay', icon: '🏨' },
    { value: 'transport', label: 'Transportation', icon: '✈️' },
    { value: 'food', label: 'Food & Culture', icon: '🍜' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a question title');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Please provide a description');
      return;
    }

    if (formData.title.length < 10) {
      toast.error('Title should be at least 10 characters long');
      return;
    }

    if (formData.description.length < 20) {
      toast.error('Description should be at least 20 characters long');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'general'
      });
      
      toast.success('Question posted successfully! 🎉');
      onClose();
    } catch (error) {
      toast.error('Failed to post question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (formData.title.trim() || formData.description.trim()) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        setFormData({ title: '', description: '', category: 'general' });
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              <h2 className="text-xl font-bold">Ask a New Question</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-1">
            Share your travel question with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-700"
              disabled={isSubmitting}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question Title *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What's your travel question? (e.g., Best time to visit Japan?)"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-gray-700"
                maxLength={150}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                Be specific and descriptive
              </p>
              <p className="text-xs text-gray-400">
                {formData.title.length}/150
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide more details about your question. Include context like destination, budget, travel dates, or specific concerns..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none resize-none text-gray-700"
              maxLength={1000}
              disabled={isSubmitting}
              required
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                The more details you provide, the better answers you'll receive
              </p>
              <p className="text-xs text-gray-400">
                {formData.description.length}/1000
              </p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Community Guidelines</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be respectful and courteous to other travelers</li>
              <li>• Provide specific details to get better answers</li>
              <li>• Search existing questions before posting</li>
              <li>• Use clear and descriptive titles</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Question
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuestionModal;