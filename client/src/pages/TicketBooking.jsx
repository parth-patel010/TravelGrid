import React, { useState } from 'react';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';
import {
  Users,
  CalendarDays,
  MapPin,
  Plane,
  TrainFront,
  Bus,
  Car,
  ArrowRightLeft,
} from 'lucide-react';

const tripModes = [
  { label: "One-Way", value: "oneWay" },
  { label: "Round Trip", value: "round" },
];

const travelOptions = [
  { label: "Flight", value: "flight", icon: Plane },
  { label: "Train", value: "train", icon: TrainFront },
  { label: "Bus", value: "bus", icon: Bus },
  { label: "Cab", value: "cab", icon: Car },
];

const classOptions = {
  flight: ["Economy", "Premium Economy", "Business", "First"],
  train: ["Sleeper", "Chair Car", "2A", "3A", "1A"],
};

const getCountry = (city) => {
  const cityToCountry = {
    "New York": "USA",
    "Los Angeles": "USA",
    "Chicago": "USA",
    "London": "UK",
    "Manchester": "UK",
    "Delhi": "India",
    "Mumbai": "India",
    "Chennai": "India",
    "Bangalore": "India",
  };
  return cityToCountry[city.trim()] || "Unknown";
};

const TicketBooking = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [travelType, setTravelType] = useState("flight");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1,
    cabin: classOptions["flight"][0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      from: "",
      to: "",
      departure: "",
      return: "",
      passengers: 1,
      cabin: classOptions[travelType][0] || "",
    });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromCountry = getCountry(form.from);
    const toCountry = getCountry(form.to);

    if (
      ["train", "bus", "cab"].includes(travelType) &&
      fromCountry !== "Unknown" &&
      toCountry !== "Unknown" &&
      fromCountry !== toCountry
    ) {
      alert(
        `❌ Cross-country ${travelType} travel is not allowed between ${fromCountry} and ${toCountry}.`
      );
      return;
    }

    setSubmitted(true);
    alert("✅ Booking submitted!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Book Your Travel</h1>

        {/* Trip Type Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {tripModes.map((mode) => (
            <button
              key={mode.value}
              className={`px-4 py-2 rounded-full ${
                tripType === mode.value
                  ? "bg-pink-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
              onClick={() => setTripType(mode.value)}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Travel Type Options */}
        <div className="flex justify-between gap-4 mb-6">
          {travelOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 transition ${
                  travelType === opt.value
                    ? "bg-pink-600 text-white border-pink-600 shadow-lg"
                    : "bg-white/20 text-white border-transparent hover:bg-pink-700/20"
                }`}
                onClick={() => {
                  setTravelType(opt.value);
                  setForm((prev) => ({
                    ...prev,
                    cabin: classOptions[opt.value]?.[0] || "",
                  }));
                }}
              >
                <Icon size={18} />
                {opt.label}
              </button>
            );
          })}
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-green-500 p-3 rounded-full">
                  <ArrowRightLeft size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
              </div>
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 block">Travel Type</span>
                      <span className="font-semibold text-pink-600 capitalize">{travelType}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">Trip Type</span>
                      <span className="font-semibold text-purple-600">
                        {tripType === "round" ? "Round-trip" : "One-way"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">From</span>
                      <span className="font-semibold text-gray-800">{form.from}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">To</span>
                      <span className="font-semibold text-gray-800">{form.to}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 block">Departure</span>
                      <span className="font-semibold text-blue-600">
                        {new Date(form.departure).toLocaleDateString()}
                      </span>
                    </div>
                    {tripType === "round" && (
                      <div>
                        <span className="text-sm text-gray-500 block">Return</span>
                        <span className="font-semibold text-blue-600">
                          {new Date(form.return).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-500 block">Passengers</span>
                      <span className="font-semibold text-green-600">
                        {form.passengers} {form.passengers === 1 ? "Person" : "People"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block">Class</span>
                      <span className="font-semibold text-orange-600">{form.cabin}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={resetForm}
              >
                Book Another Trip
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 text-center">Travel Details</h3>
              <div className="grid gap-6 md:grid-cols-3 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                  <div className="relative">
                    <MapPin className="absolute top-3 left-3 text-pink-500" size={18} />
                    <input
                      type="text"
                      name="from"
                      placeholder="Departure city"
                      required
                      value={form.from}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-end pb-3 md:pb-0">
                  <button
                    type="button"
                    title="Swap destinations"
                    onClick={() => setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }))}
                    className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <ArrowRightLeft size={20} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                  <div className="relative">
                    <MapPin className="absolute top-3 left-3 text-pink-500" size={18} />
                    <input
                      type="text"
                      name="to"
                      placeholder="Destination city"
                      required
                      value={form.to}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-3 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departure</label>
                  <div className="relative">
                    <CalendarDays className="absolute top-3 left-3 text-pink-500" size={18} />
                    <input
                      type="date"
                      name="departure"
                      required
                      value={form.departure}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                    />
                  </div>
                </div>
                {tripType === "round" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Return</label>
                    <div className="relative">
                      <CalendarDays className="absolute top-3 left-3 text-pink-500" size={18} />
                      <input
                        type="date"
                        name="return"
                        required
                        value={form.return}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute top-3 left-3 text-pink-500" size={18} />
                    <input
                      type="number"
                      name="passengers"
                      min="1"
                      max="10"
                      required
                      value={form.passengers}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Class</label>
              <select
                name="cabin"
                value={form.cabin}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
              >
                {(classOptions[travelType] || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="w-full max-w-md py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Search {travelType.charAt(0).toUpperCase() + travelType.slice(1)}s</span>
                  <ArrowRightLeft size={20} />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TicketBooking;