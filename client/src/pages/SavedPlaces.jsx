import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDashboardData } from '../context/DashboardDataContext';
import { config } from '../config';

const SavedPlaces = () => {
    const navigate = useNavigate();
    const { setPlaceCount } = useDashboardData();
    const toastShown = useRef(false);

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchSavedPlaces = async () => {
            try {
                const res = await fetch(`${config.API_BASE_URL}/save/my-saved-places`, {
                    method: 'GET',
                    credentials: 'include', // ✅ Important for cookies
                });

                const data = await res.json();

                if (res.ok) {
                    setPlaces(data.savedPlaces);
                    setPlaceCount(data.savedPlaces.length);
                    if (!toastShown.current) {
                        toast.success('Loaded saved places!');
                        toastShown.current = true;
                    }
                } else {
                    toast.error(data.message || 'Failed to load saved places.');
                }
            } catch (err) {
                console.error('Fetch failed:', err);
                toast.error('Error fetching saved places.');
            }
        };

        fetchSavedPlaces();
    }, [setPlaceCount]);

    const handleDelete = async (placeId) => {
        try {
            const res = await fetch(`${config.API_BASE_URL}/save/delete/${placeId}`, {
                method: 'DELETE',
                credentials: 'include', // ✅ Important
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Place removed from saved list!');
                setPlaces(prev => prev.filter(place => place.placeId !== placeId));
            } else {
                toast.error(data.message || 'Could not delete the place');
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('Something went wrong while deleting!');
        }
    };

    const handleBookNow = (placeId) => {
        // Navigate to hotel booking page since saved places are hotels
        navigate(`/hotel-booking?hotelId=${placeId}`);
    };

    const handleOverview = (placeId) => {
        // Navigate to hotel details page
        navigate(`/hotels/${placeId}`);
    };

    useEffect(() => {
        setPlaceCount(places.length);
    }, [places, setPlaceCount]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-pink-900 p-6 flex justify-center items-center">
            <div className="w-full max-w-4xl">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Saved Places</h2>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>

                    <div className="max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                        <ul className="space-y-4">
                            {places.map((place, index) => (
                                <li key={index} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition">
                                    <h3 className="text-white font-semibold">{place.name}</h3>
                                    <p className="text-gray-300 text-sm">{place.description}</p>

                                    {/* Button Group */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <button
                                            onClick={() => handleOverview(place.placeId)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                                        >
                                            Overview
                                        </button>

                                        <button
                                            onClick={() => handleBookNow(place.placeId)}
                                            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                                        >
                                            Book Now
                                        </button>

                                        <button
                                            onClick={() => handleDelete(place.placeId)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {places.length === 0 && (
                            <p className="text-gray-300 text-center mt-4">No saved places found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedPlaces;
