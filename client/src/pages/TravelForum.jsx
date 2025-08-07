import React, { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp, Plus, Calendar, User, Search, Filter, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import NewQuestionModal from "../components/NewQuestionModal";

const initialForumTopics = [
  {
    id: 1,
    title: "Best travel hacks for solo travelers",
    description: "Share your favorite tips for solo adventures and make the most of your solo travel experience.",
    category: "solo",
    author: "TravelExplorer",
    createdAt: "2024-01-15",
    replies: [
      "Always keep digital copies of your documents.",
      "Pack light and use a universal adapter.",
    ],
    views: 234,
    trending: true,
  },
  {
    id: 2,
    title: "How to plan a budget-friendly trip to Leh",
    description: "Looking for affordable travel and stay options for exploring the beautiful landscapes of Leh Ladakh.",
    category: "budget",
    author: "BudgetBackpacker",
    createdAt: "2024-01-10",
    replies: [
      "Travel by bus and stay in hostels for best rates.",
      "Book flights early and try local guesthouses.",
    ],
    views: 189,
    trending: false,
  },
  {
    id: 3,
    title: "Top 5 underrated places in South India",
    description: "Suggest hidden gems for my next trip that are off the beaten path and perfect for authentic experiences.",
    category: "destinations",
    author: "SouthIndiaLover",
    createdAt: "2024-01-08",
    replies: [
      "Try Chettinad, Hampi, and Gokarna.",
      "Araku Valley and Yercaud are beautiful too!",
    ],
    views: 156,
    trending: true,
  },
];

export default function Forum() {
  const { isDarkMode } = useTheme();
  const [forumTopics, setForumTopics] = useState(initialForumTopics);
  const [openReplies, setOpenReplies] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🌍', color: 'from-blue-500 to-cyan-500' },
    { value: 'general', label: 'General Travel', icon: '🌍', color: 'from-green-500 to-emerald-500' },
    { value: 'destinations', label: 'Destinations', icon: '📍', color: 'from-pink-500 to-rose-500' },
    { value: 'budget', label: 'Budget Travel', icon: '💰', color: 'from-yellow-500 to-orange-500' },
    { value: 'solo', label: 'Solo Travel', icon: '🎒', color: 'from-purple-500 to-violet-500' },
    { value: 'tips', label: 'Tips & Hacks', icon: '💡', color: 'from-indigo-500 to-blue-500' },
    { value: 'accommodation', label: 'Hotels & Stay', icon: '🏨', color: 'from-teal-500 to-cyan-500' },
    { value: 'transport', label: 'Transportation', icon: '✈️', color: 'from-red-500 to-pink-500' },
    { value: 'food', label: 'Food & Culture', icon: '🍜', color: 'from-amber-500 to-yellow-500' }
  ];

  const toggleReplies = (id) => {
    setOpenReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNewQuestion = (questionData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newQuestion = {
          id: Date.now(),
          title: questionData.title,
          description: questionData.description,
          category: questionData.category,
          author: "CurrentUser",
          createdAt: new Date().toISOString().split('T')[0],
          replies: [],
          views: 0,
          trending: false,
        };

        setForumTopics(prev => [newQuestion, ...prev]);
        
        setTimeout(() => {
          const newQuestionElement = document.querySelector(`[data-topic-id="${newQuestion.id}"]`);
          if (newQuestionElement) {
            newQuestionElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            newQuestionElement.classList.add('highlight-new-question');
            setTimeout(() => {
              newQuestionElement.classList.remove('highlight-new-question');
            }, 3000);
          }
        }, 100);

        resolve();
      }, 1000);
    });
  };

  const getCategoryData = (category) => {
    return categories.find(c => c.value === category) || categories[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const sortTopics = (topics) => {
    switch (sortBy) {
      case 'newest':
        return [...topics].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return [...topics].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'mostReplies':
        return [...topics].sort((a, b) => b.replies.length - a.replies.length);
      case 'trending':
        return [...topics].sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.views - a.views;
        });
      default:
        return topics;
    }
  };

  const filteredAndSortedTopics = sortTopics(
    forumTopics.filter(topic => {
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  );

  return (
    <>
      <style jsx>{`
        .highlight-new-question {
          animation: highlight 3s ease-in-out;
        }
        
        @keyframes highlight {
          0% { 
            background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}; 
            transform: scale(1.02); 
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
          }
          50% { 
            background-color: ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}; 
          }
          100% { 
            background-color: transparent; 
            transform: scale(1); 
            box-shadow: none;
          }
        }

        .glassmorphism {
          backdrop-filter: blur(12px);
          background: ${isDarkMode 
            ? 'rgba(30, 41, 59, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)'
          };
          border: 1px solid ${isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(255, 255, 255, 0.3)'
          };
        }

        .search-glow:focus-within {
          box-shadow: 0 0 0 3px ${isDarkMode 
            ? 'rgba(236, 72, 153, 0.3)' 
            : 'rgba(59, 130, 246, 0.3)'
          };
        }

        .category-gradient-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className={`min-h-screen mt-20 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-pink-50'
      } p-4 lg:p-8`}>
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Header Section */}
          <div className="text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className={`w-full h-full bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-pink-500 via-purple-500 to-blue-500' 
                  : 'from-blue-500 via-purple-500 to-pink-500'
              }`} />
            </div>
            <div className="relative z-10 py-12">
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Travel{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Forum
                </span>
              </h1>
              <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Connect with fellow travelers, share experiences, and discover insider tips from a community of passionate explorers around the globe.
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className={`glassmorphism rounded-3xl p-6 shadow-xl border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className={`relative search-glow rounded-2xl transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search discussions, topics, or authors..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="lg:w-64">
                <div className="relative">
                  <Filter className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-pink-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                    }`}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="mostReplies">Most Replies</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Actions Bar */}
          <div className={`glassmorphism rounded-3xl p-6 shadow-xl border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
                    {forumTopics.length}
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Questions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {forumTopics.reduce((acc, topic) => acc + topic.replies.length, 0)}
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Replies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
                    {new Set(forumTopics.map(topic => topic.author)).size}
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Contributors
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Ask a New Question
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className={`glassmorphism rounded-3xl p-6 shadow-xl border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-3">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`category-gradient-hover p-4 rounded-2xl text-sm font-medium transition-all duration-300 flex flex-col items-center gap-2 ${
                    selectedCategory === category.value
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-xs text-center leading-tight">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Info */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="text-lg">
                {filteredAndSortedTopics.length > 0 
                  ? `Found ${filteredAndSortedTopics.length} discussion${filteredAndSortedTopics.length !== 1 ? 's' : ''}`
                  : 'No discussions found'
                }
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== 'all' && ` in ${getCategoryData(selectedCategory).label}`}
              </p>
            </div>
          )}

          {/* Forum Topics */}
          <div className="space-y-6">
            {filteredAndSortedTopics.length > 0 ? (
              filteredAndSortedTopics.map((topic) => {
                const categoryData = getCategoryData(topic.category);
                return (
                  <div
                    key={topic.id}
                    data-topic-id={topic.id}
                    className={`glassmorphism rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border ${
                      isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4 flex-wrap">
                            <span className={`bg-gradient-to-r ${categoryData.color} text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2`}>
                              {categoryData.icon} {categoryData.label}
                            </span>
                            {topic.trending && (
                              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </span>
                            )}
                            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <User className="w-4 h-4" />
                              {topic.author}
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Calendar className="w-4 h-4" />
                              {formatDate(topic.createdAt)}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {topic.views} views
                            </div>
                          </div>
                          <h2 className={`text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-all duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {topic.title}
                          </h2>
                          <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {topic.description}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ml-6 p-3 rounded-2xl ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-pink-400 hover:bg-gray-800' 
                              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          onClick={() => toggleReplies(topic.id)}
                        >
                          <MessageCircle className="w-6 h-6" />
                          <span className="font-semibold text-lg">{topic.replies.length}</span>
                          {openReplies[topic.id] ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {openReplies[topic.id] && topic.replies.length > 0 && (
                        <div className="mt-8 border-t pt-6 space-y-4" style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
                          <h4 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Replies ({topic.replies.length})
                          </h4>
                          {topic.replies.map((reply, idx) => (
                            <div
                              key={idx}
                              className={`p-6 rounded-2xl border ${
                                isDarkMode 
                                  ? 'bg-gray-800 border-gray-700' 
                                  : 'bg-blue-50 border-blue-100'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  isDarkMode 
                                    ? 'bg-pink-600 text-white' 
                                    : 'bg-blue-200 text-blue-800'
                                }`}>
                                  {idx + 1}
                                </div>
                                <span className={`font-semibold ${
                                  isDarkMode ? 'text-pink-400' : 'text-blue-600'
                                }`}>
                                  Anonymous Traveler
                                </span>
                              </div>
                              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {reply}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {openReplies[topic.id] && topic.replies.length === 0 && (
                        <div className="mt-8 border-t pt-6" style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
                          <p className={`text-center italic text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No replies yet. Be the first to help this traveler! 🚀
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`glassmorphism rounded-3xl p-16 text-center shadow-xl border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <MessageCircle className={`w-20 h-20 mx-auto mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {searchQuery 
                    ? 'No discussions found' 
                    : `No questions in ${getCategoryData(selectedCategory).label} yet`
                  }
                </h3>
                <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {searchQuery 
                    ? 'Try adjusting your search terms or explore different categories.'
                    : `Be the first to start a conversation in ${getCategoryData(selectedCategory).label}!`
                  }
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {searchQuery ? 'Ask a Question' : 'Ask the First Question'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <NewQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewQuestion}
      />
    </>
  );
}