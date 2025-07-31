import { useState, useEffect } from 'react';

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/Adarsh-Chaubey03/TravelGrid/contributors');
        if (!res.ok) throw new Error('Failed to fetch contributors');
        const data = await res.json();
        setContributors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-pink-200 text-xl">Loading contributors...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-400 mb-8">Our Contributors</h1>
        
        {error ? (
          <div className="text-pink-200 text-xl">Unable to load contributors. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contributors.map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-pink-400"
                />
                <div className="text-xl font-semibold text-pink-300">{contributor.login}</div>
                <div className="text-pink-200 text-sm mb-2">@{contributor.login}</div>
                <div className="text-pink-100 text-sm">
                  {contributor.contributions} commit{contributor.contributions !== 1 ? 's' : ''}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 