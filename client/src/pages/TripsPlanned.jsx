import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../context/DashboardDataContext';

const TripsPlanned = () => {
    const navigate = useNavigate();
    const { setTripCount } = useDashboardData();

    const trips = [
        { destination: 'Paris, France', date: '2024-03-15', status: 'Completed' },
        { destination: 'Tokyo, Japan', date: '2024-06-20', status: 'Upcoming' },
        { destination: 'Bali, Indonesia', date: '2024-08-10', status: 'Planning' },
    ];

    useEffect(() => {
        setTripCount(trips.length);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-pink-900 p-6 flex justify-center items-center">
            <div className="w-full max-w-4xl">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Trips Planned</h2>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                        <div className="space-y-4">
                            {trips.map((trip, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition"
                                >
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{trip.destination}</h3>
                                        <p className="text-gray-300 text-sm">{trip.date}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${trip.status === 'Completed'
                                            ? 'bg-green-500/20 text-green-400'
                                            : trip.status === 'Upcoming'
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}
                                    >
                                        {trip.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripsPlanned;
