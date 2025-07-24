import React, { useState } from "react";
import Navbar from "../components/Custom/Navbar";
import Footer from "../components/Custom/Footer";

import {
  Users,
  CalendarDays,
  MapPin,
  Plane,
  TrainFront,
  Bus,
  Car,
  ArrowRightLeft,
} from "lucide-react";

const tripModes = [
  { label: "One-Way", value: "oneWay" },
  { label: "Round Trip", value: "roundTrip" },
];

const travelOptions = [
  { label: "Flight", value: "flight", icon: <Plane size={18} /> },
  { label: "Train", value: "train", icon: <TrainFront size={18} /> },
  { label: "Bus", value: "bus", icon: <Bus size={18} /> },
  { label: "Cab", value: "cab", icon: <Car size={18} /> },
];

function TicketBooking() {
  const [tripMode, setTripMode] = useState("oneWay");
  const [travelType, setTravelType] = useState("flight");
  const [form, setForm] = useState({
    from: "",
    to: "",
    depart: "",
    return: "",
    passengers: 1,
    cabin: "Economy",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      from: "",
      to: "",
      depart: "",
      return: "",
      passengers: 1,
      cabin: "Economy",
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-50 overflow-x-hidden">
      <Navbar />

      <main className="relative flex flex-col flex-1 items-center w-full pt-8 pb-10 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Book Your <span className="text-pink-600">Perfect Trip</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Search and compare prices for flights, trains, buses, and cabs all in one place
          </p>
        </div>

        {/* Booking Card */}
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden">
          {/* Travel Type Selection */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6">
            <h2 className="text-white text-xl font-semibold mb-4 text-center">Choose Your Travel Mode</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {travelOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTravelType(opt.value)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    travelType === opt.value
                      ? 'bg-white text-pink-600 shadow-lg'
                      : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                  }`}

      <main className="relative flex flex-col flex-1 items-center w-full pt-24 pb-10 px-4">
        {/* Background city image */}
        <img
          src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80"
          alt="City skyline"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md border border-pink-400/30 rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Travel type tabs (responsive) */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
            {travelOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTravelType(opt.value)}
                className={`flex items-center justify-center sm:justify-start gap-0 sm:gap-2 px-0 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all border
                  ${
                    travelType === opt.value
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white/20 text-white border-transparent hover:bg-pink-700/20"
                  }
                  ${travelType === opt.value ? "shadow-lg" : ""} 
                  w-10 h-10 sm:w-auto sm:h-auto`}
                title={opt.label}
              >
                {opt.icon}
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Trip mode toggle */}
          <div className="flex gap-4 justify-center mb-10">
            {tripModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => setTripMode(mode.value)}
                className={`px-6 py-2 rounded-full font-medium border transition-all ${
                  tripMode === mode.value
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white/20 text-white border-transparent hover:bg-pink-700/20"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Form or Success Message */}
          {submitted ? (
            <div className="text-center text-pink-100">
              <h3 className="text-3xl font-bold text-green-400 mb-4 flex items-center justify-center gap-2">
                <ArrowRightLeft size={24} /> Booking Confirmed!
              </h3>
              <p className="max-w-xl mx-auto leading-relaxed">
                You have booked a {travelType}{" "}
                {tripMode === "roundTrip" ? "round-trip" : "one-way"} ticket
                from
                <span className="font-semibold text-white">
                  {" "}
                  {form.from}
                </span>{" "}
                to
                <span className="font-semibold text-white">
                  {" "}
                  {form.to}
                </span>{" "}
                departing on
                <span className="font-semibold text-white"> {form.depart}</span>
                {tripMode === "roundTrip" && (
                  <>
                    {" "}
                    and returning on
                    <span className="font-semibold text-white">
                      {" "}
                      {form.return}
                    </span>
                  </>
                )}
                . Travellers:{" "}
                <span className="font-semibold text-white">
                  {form.passengers}
                </span>{" "}
                • Cabin:
                <span className="font-semibold text-white"> {form.cabin}</span>.
              </p>
              <button
                className="mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold"
                onClick={resetForm}
              >
                New Search
              </button>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Core search panel */}
              <div className="grid gap-4 md:grid-cols-5 items-end">
                {/* From */}
                <label className="relative block">
                  <MapPin
                    className="absolute top-3 left-3 text-pink-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="from"
                    placeholder="From"
                    required
                    value={form.from}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                  />
                </label>
                {/* Swap button on medium screens */}
                <button
                  type="button"
                  title="Swap"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      from: prev.to,
                      to: prev.from,
                    }))
                  }
                  className="hidden md:flex items-center justify-center self-stretch bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-all"

                >
                  <ArrowRightLeft size={20} />
                </button>

              ))}
            </div>
          </div>

          {/* Trip Type Selection */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex gap-4 justify-center">
              {tripModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setTripMode(mode.value)}
                  className={`px-8 py-2 rounded-full font-medium transition-all duration-300 ${
                    tripMode === mode.value
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-pink-50'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-green-500 p-3 rounded-full">
                      <ArrowRightLeft size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600">
                      Booking Confirmed!
                    </h3>
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
                          <span className="font-semibold text-purple-600">{tripMode === 'roundTrip' ? 'Round-trip' : 'One-way'}</span>
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
                          <span className="font-semibold text-blue-600">{new Date(form.depart).toLocaleDateString()}</span>
                        </div>
                        {tripMode === 'roundTrip' && (
                          <div>
                            <span className="text-sm text-gray-500 block">Return</span>
                            <span className="font-semibold text-blue-600">{new Date(form.return).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-gray-500 block">Passengers</span>
                          <span className="font-semibold text-green-600">{form.passengers} {form.passengers === 1 ? 'Person' : 'People'}</span>
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
                {/* Main Search Fields */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">Travel Details</h3>
                  {/* From and To Section */}
                  <div className="grid gap-6 md:grid-cols-3 items-end">
                    {/* From */}
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
                    {/* Swap Button */}
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
                    {/* To */}
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
                  {/* Dates and Details Section */}
                  <div className="grid gap-6 md:grid-cols-3 items-end">
                    {/* Departure Date */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Departure</label>
                      <div className="relative">
                        <CalendarDays className="absolute top-3 left-3 text-pink-500" size={18} />
                        <input
                          type="date"
                          name="depart"
                          required
                          value={form.depart}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                        />
                      </div>
                    </div>
                    {/* Return Date (for round trip) */}
                    {tripMode === 'roundTrip' && (
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
                    {/* Passengers */}
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
                {/* Travel Class */}
                <div className="max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Class</label>
                  <select
                    name="cabin"
                    value={form.cabin}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                  >
                    {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {/* Search Button */}
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
                {/* To */}
                <label className="relative block">
                  <MapPin
                    className="absolute top-3 left-3 text-pink-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="to"
                    placeholder="To"
                    required
                    value={form.to}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                  />
                </label>
                {/* Depart Date */}
                <label className="relative block">
                  <CalendarDays
                    className="absolute top-3 left-3 text-pink-400"
                    size={18}
                  />
                  <input
                    type="date"
                    name="depart"
                    required
                    value={form.depart}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                  />
                </label>
                {/* Return Date (conditional) */}
                {tripMode === "roundTrip" ? (
                  <label className="relative block">
                    <CalendarDays
                      className="absolute top-3 left-3 text-pink-400"
                      size={18}
                    />
                    <input
                      type="date"
                      name="return"
                      required
                      value={form.return}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                    />
                  </label>
                ) : (
                  <label className="relative block">
                    <Users
                      className="absolute top-3 left-3 text-pink-400"
                      size={18}
                    />
                    <input
                      type="number"
                      name="passengers"
                      min="1"
                      max="10"
                      required
                      value={form.passengers}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                    />
                  </label>
                )}
              </div>
              {/* Passengers & Class row */}
              <div className="grid md:grid-cols-2 gap-6">
                <label className="relative block">
                  <Users
                    className="absolute top-3 left-3 text-pink-400"
                    size={18}
                  />
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    max="10"
                    required
                    value={form.passengers}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                  />
                </label>
                <select
                  name="cabin"
                  value={form.cabin}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
                >
                  {["Economy", "Premium Economy", "Business", "First"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl text-lg tracking-wide shadow-lg transition-all hover:shadow-pink-700/50"
              >
                Search{" "}
                {travelType.charAt(0).toUpperCase() + travelType.slice(1)}s
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TicketBooking;