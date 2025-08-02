import { useEffect, useState } from 'react';

const NearbyAttractions = ({ lat, lng }) => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    const fetchAttractions = async () => {
      try {
        // In production: await fetch(`/api/attractions?lat=${lat}&lng=${lng}`)
        setTimeout(() => {
          setAttractions([
            { id: 1, name: "Historic City Center", distance: "0.5" },
            { id: 2, name: "Local Market", distance: "1.2" },
            { id: 3, name: "Mountain Viewpoint", distance: "3.0" }
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching attractions:", error);
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [lat, lng]);

  if (loading) return <div className="text-sm text-gray-500">Loading attractions...</div>;

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Nearby Attractions</h3>
      <ul className="space-y-2">
        {attractions.map(attraction => (
          <li key={attraction.id} className="flex justify-between">
            <span>{attraction.name}</span>
            <span className="text-gray-500">{attraction.distance} km</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyAttractions;