import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboardData } from '../context/DashboardDataContext';
import { MapPin, Calendar, Heart, LogOut } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { tripCount, placeCount, countryCount } = useDashboardData();

    const stats = [
        {
            label: "Trips Planned",
            value: tripCount,
            icon: <MapPin className="w-6 h-6" />
        },
        {
            label: "Countries Visited",
            value: countryCount,
            icon: <Calendar className="w-6 h-6" />
        },
        {
            label: "Saved Places",
            value: placeCount,
            icon: <Heart className="w-6 h-6" />
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-pink-900 px-4 sm:px-8 md:px-16 py-10 md:py-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-pink-400 object-cover"
                            />
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
                                <p className="text-gray-300 text-sm sm:text-base">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/20 shadow-lg shadow-pink-900/20"
                            onClick={() => {
                                if (stat.label === 'Trips Planned') navigate('/dashboard/trips');
                                else if (stat.label === 'Countries Visited') navigate('/dashboard/countries');
                                else if (stat.label === 'Saved Places') navigate('/dashboard/saved');
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 text-sm sm:text-base">{stat.label}</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                                <div className="text-pink-400">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call-to-action section */}
                <div className="bg-white/5 border border-white/20 rounded-2xl p-6 sm:p-10 text-center mt-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Ready to explore more?</h2>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                        Plan your next trip or discover new destinations around the world!
                    </p>
                    <button
                        onClick={() => navigate('/discover')}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                        Discover New Places
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

