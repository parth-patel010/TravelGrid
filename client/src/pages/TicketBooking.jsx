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
    // Add more cities as needed
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
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700"
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

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">From</label>
            <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
              <MapPin size={18} />
              <input
                name="from"
                type="text"
                required
                value={form.from}
                onChange={handleChange}
                placeholder="Departure city"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">To</label>
            <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
              <ArrowRightLeft size={18} />
              <input
                name="to"
                type="text"
                required
                value={form.to}
                onChange={handleChange}
                placeholder="Destination city"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Departure</label>
            <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
              <CalendarDays size={18} />
              <input
                name="departure"
                type="date"
                required
                value={form.departure}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {tripType === "round" && (
            <div>
              <label className="block mb-1 font-semibold">Return</label>
              <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
                <CalendarDays size={18} />
                <input
                  name="return"
                  type="date"
                  required
                  value={form.return}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1 font-semibold">Passengers</label>
            <div className="flex items-center gap-2 border p-2 rounded-md bg-white">
              <Users size={18} />
              <input
                name="passengers"
                type="number"
                min={1}
                max={10}
                required
                value={form.passengers}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {travelType !== "bus" && travelType !== "cab" && (
            <div>
              <label className="block mb-1 font-semibold">Travel Class</label>
              <select
                name="cabin"
                value={form.cabin}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-pink-500 text-pink-600"
              >
                {(classOptions[travelType] || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            {`Search ${travelType.charAt(0).toUpperCase() + travelType.slice(1)}s`}
          </button>
        </form>

        {submitted && (
          <div className="mt-6 text-green-600 font-semibold text-center">
            ✅ Booking submitted successfully!
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TicketBooking;