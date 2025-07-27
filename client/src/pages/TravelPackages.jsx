import { Package } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {packages} from "../data/PackageData";
import Navbar from "../components/Custom/Navbar";

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const digitsOnly = String(priceStr).replace(/[^\d]/g, "");
  return parseInt(digitsOnly, 10);
};

const TravelPackages = () => {
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  const filteredPackages = packages.filter((pkg) => {
    const numericPrice = parsePrice(pkg.price);
    return pkg.rating >= minRating && numericPrice <= maxPrice;
  });

  const handlePriceChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setMaxPrice(Infinity);
    } else {
      setMaxPrice(Number(val));
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col flex-1 w-full items-center pt-24">
        <section className="w-full py-24 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Discover Our <span className="text-pink-400">Travel Packages</span>
          </h1>
          <p className="text-lg md:text-xl text-pink-200 max-w-2xl mx-auto">
            Handpicked vacation deals crafted for unforgettable experiences.
          </p>

          {/* Filters */}
          <div className="mt-6 flex justify-center items-center gap-8 flex-wrap text-white">
            <div className="flex items-center gap-2">
              <label htmlFor="minRating" className="font-semibold whitespace-nowrap">
                Minimum Rating:
              </label>
              <select
                id="minRating"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-black/30 rounded-md px-3 py-1 text-white"
              >
                <option value={0}>All</option>
                <option value={1}>1 Star & Up</option>
                <option value={2}>2 Stars & Up</option>
                <option value={3}>3 Stars & Up</option>
                <option value={4}>4 Stars & Up</option>
                <option value={5}>5 Stars Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="maxPrice" className="font-semibold whitespace-nowrap">
                Max Price (₹):
              </label>
              <input
                type="number"
                id="maxPrice"
                placeholder="No limit"
                onChange={handlePriceChange}
                className="bg-black/30 rounded-md px-3 py-1 text-white w-28"
                min="0"
              />
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="max-w-7xl w-full px-4 pb-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="backdrop-blur-sm bg-white/5 border border-pink-400/20 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 transform hover:bg-white/8 cursor-pointer"
                onClick={() => navigate(`/package/${pkg.id}`)}
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-white mb-1">{pkg.title}</h3>
                  <span className="text-pink-300 font-medium mb-2">{pkg.duration}</span>

                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        className={`w-5 h-5 ${
                          idx < pkg.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927a1 1 0 011.902 0l1.517 4.674a1 1 0 00.95.69h4.911c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.517 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.784-.57-.38-1.81.588-1.81h4.912a1 1 0 00.95-.69l1.517-4.674z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-pink-200 font-semibold mb-4">{pkg.price}</p>

                  <div className="mb-4">
                    <h4 className="text-pink-400 text-lg font-bold mb-2">Reviews</h4>
                    {pkg.reviews && pkg.reviews.length > 0 ? (
                      <ul className="space-y-1 text-pink-100 text-sm max-h-28 overflow-y-auto pr-2">
                        {pkg.reviews.slice(0, 1).map((review, idx) => (
                          <li key={idx}>
                            <span className="font-semibold text-pink-300">{review.name}:</span>{" "}
                            {review.comment}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-pink-300 text-xs italic">No reviews yet.</p>
                    )}
                  </div>


                  <button
                    // onClick={() => openForm(pkg)}
                    onClick={() => navigate(`/package/${pkg.id}`)}
                    className="mt-auto self-start bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:cursor-pointer"
                  >

                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-pink-300 text-center col-span-full">
              No packages match the selected filters.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default TravelPackages;
