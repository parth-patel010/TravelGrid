import { useEffect, useState } from 'react';

const WeatherWidget = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng]);

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg mt-4 w-full max-w-md text-white shadow-lg transition-opacity duration-500 ease-in-out">
      <h3 className="font-semibold text-lg mb-2">🌤 Current Weather</h3>
      {loading ? (
        <p className="text-white/70">Loading weather...</p>
      ) : weather ? (
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">
            {weather.temperature}°C
          </span>
          <div className="text-sm leading-relaxed">
            <p>💨 Wind: {weather.windspeed} km/h</p>
            <p>⛅ Code: {weather.weathercode}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-300">Weather data unavailable</p>
      )}
    </div>
  );
};

export default WeatherWidget;
