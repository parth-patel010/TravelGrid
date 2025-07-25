import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../context/DashboardDataContext';

const SavedPlaces = () => {
    const navigate = useNavigate();
    const { setPlaceCount } = useDashboardData(); // ✅ Correct context setter

    const [places] = useState([
        { name: 'Paris, France', description: 'Visited Eiffel Tower and Louvre Museum' },
        { name: 'Kyoto, Japan', description: 'Explored Fushimi Inari Shrine' },
        { name: 'Rome, Italy', description: 'Saw Colosseum and Vatican City' },
        { name: 'New York, USA', description: 'Times Square and Central Park' },
        { name: 'Barcelona, Spain', description: 'La Sagrada Familia and beaches' },
        { name: 'Istanbul, Turkey', description: 'Blue Mosque and Grand Bazaar' },
    ]);

    // ✅ Correct useEffect with context
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
                            className="text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition hover: cursor-pointer"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                        <ul className="space-y-4">
                            {places.map((place, index) => (
                                <li
                                    key={index}
                                    className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition"
                                >
                                    <h3 className="text-white font-semibold">{place.name}</h3>
                                    <p className="text-gray-300 text-sm">{place.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedPlaces;





