import React, { useState } from 'react';
import Navbar from '../components/Custom/Navbar';
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
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col flex-1 w-full items-center pt-20">
        <div className="max-w-3xl mx-auto px-4 py-10 w-full">
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
                      : "bg-white/20 text-black border-pink-600 hover:bg-pink-700/20"
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
              {/* (Form content same as your original code...) */}
              {/* No changes here — skipping for brevity */}
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default TicketBooking;
