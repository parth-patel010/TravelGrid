import React from 'react';
import { TravelCountdownTimer } from '../components/TravelCountdownTimer';
import { useTheme } from '@/context/ThemeContext';

const CountdownDemo = () => {
  const sampleTrips = [
    {
      _id: '1',
      destination: 'Paris',
      country: 'France',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      numberOfDays: 7,
      interests: ['Culture', 'Food', 'Art'],
      image: '/public/paris.jpeg'
    },
    {
      _id: '2',
      destination: 'Tokyo',
      country: 'Japan',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      numberOfDays: 10,
      interests: ['Technology', 'Food', 'Culture'],
      image: '/public/paris.jpeg'
    },
    {
      _id: '3',
      destination: 'New York',
      country: 'USA',
      startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      numberOfDays: 5,
      interests: ['Shopping', 'Food', 'Entertainment'],
      image: '/public/paris.jpeg'
    }
  ];

  const { isDarkMode } = useTheme();

  // Custom light mode card classes
  const lightCardClasses = 'bg-pink-100/40 border-pink-500 text-pink-700';

  return (
    <div
      className={`min-h-screen pt-24 px-6 pb-6 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-pink-800'
            }`}
          >
            Travel Countdown Timer
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-pink-700'
            }`}
          >
            Experience the excitement of upcoming trips with our interactive
            countdown timer, daily travel tips, and social sharing features.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '⏰', title: 'Real-time Countdown', desc: 'Watch the seconds tick down to your departure with beautiful animations' },
            { icon: '💡', title: 'Daily Travel Tips', desc: 'Get personalized tips based on destination, time until trip, and your interests' },
            { icon: '📱', title: 'Social Sharing', desc: 'Share your excitement on social media with customizable messages' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 border text-center backdrop-blur-lg shadow-lg ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white'
                  : lightCardClasses
              }`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Countdown Timer with styled card */}
        <div className="mb-12">
          <div
            className={`rounded-xl p-6 border backdrop-blur-lg shadow-lg ${
              isDarkMode
                ? 'bg-white/10 border-white/20 text-white'
                : lightCardClasses
            }`}
          >
            <TravelCountdownTimer
              trips={sampleTrips}
              onTripUpdate={() => {
                console.log('Trip updated');
              }}
            />
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              title: '🎨 Customizable Themes',
              desc: 'Choose from multiple beautiful themes including Ocean, Sunset, Forest, and Midnight. Personalize your countdown experience to match your style.',
              list: [
                'Multiple color schemes',
                'Progress bar animations',
                'Motivational messages',
                'Responsive design'
              ]
            },
            {
              title: '🔔 Smart Notifications',
              desc: 'Never miss important trip milestones with customizable notification schedules.',
              list: [
                '1 week before departure',
                '1 day before departure',
                '1 hour before departure',
                'Push, email, and sound alerts'
              ]
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 border backdrop-blur-lg shadow-lg ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white'
                  : lightCardClasses
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="mb-4">{item.desc}</p>
              <ul className="space-y-2">
                {item.list.map((li, liIdx) => <li key={liIdx}>• {li}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Features */}
        <div
          className={`rounded-xl p-8 border backdrop-blur-lg shadow-lg ${
            isDarkMode
              ? 'bg-white/10 border-white/20 text-white'
              : lightCardClasses
          }`}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            🚀 Technical Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Real-time Updates', desc: 'Live countdown with setInterval' },
              { icon: '🎭', title: 'Framer Motion', desc: 'Smooth animations & transitions' },
              { icon: '📱', title: 'Responsive Design', desc: 'Mobile-first approach' },
              { icon: '♿', title: 'Accessibility', desc: 'Screen reader support' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to add this to your project?
          </h3>
          <p className="mb-6">
            The Travel Countdown Timer is fully integrated and ready to use. It
            automatically connects with your existing trip management system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
              View Documentation
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  : lightCardClasses
              }`}
            >
              Customize Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownDemo;
