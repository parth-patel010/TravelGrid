import React, { useState } from 'react';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';

const travelOptions = [
  { label: 'Flight', value: 'flight' },
  { label: 'Train', value: 'train' },
  { label: 'Bus', value: 'bus' },
  { label: 'Cab', value: 'cab' },
];

function TicketBooking() {
  const [form, setForm] = useState({
    type: 'flight',
    from: '',
    to: '',
    date: '',
    passengers: 1,
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

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-pink-50 overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col flex-1 items-center justify-center w-full h-full pt-24 pb-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center border border-pink-200">
          <h2 className="text-4xl font-extrabold text-pink-500 mb-8 tracking-tight drop-shadow">Book Your Ticket</h2>
          {submitted ? (
            <div className="text-center">
              <div className="text-xl text-green-600 font-semibold mb-2">Booking Successful!</div>
              <div className="text-pink-700">Thank you for booking your {form.type} ticket from <b>{form.from}</b> to <b>{form.to}</b> on <b>{form.date}</b> for <b>{form.passengers}</b> passenger(s).</div>
              <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors shadow" onClick={() => setSubmitted(false)}>Book Another</button>
            </div>
          ) : (
            <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
              <label className="flex flex-col text-pink-700 font-semibold">
                Travel Type
                <select name="type" value={form.type} onChange={handleChange} className="mt-2 p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-pink-700 shadow-sm">
                  {travelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </label>
              <div className="flex gap-4">
                <label className="flex-1 flex flex-col text-pink-700 font-semibold">
                  From
                  <input type="text" name="from" value={form.from} onChange={handleChange} required placeholder="Departure City" className="mt-2 p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-pink-700 shadow-sm placeholder-pink-300" />
                </label>
                <label className="flex-1 flex flex-col text-pink-700 font-semibold">
                  To
                  <input type="text" name="to" value={form.to} onChange={handleChange} required placeholder="Destination City" className="mt-2 p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-pink-700 shadow-sm placeholder-pink-300" />
                </label>
              </div>
              <div className="flex gap-4">
                <label className="flex-1 flex flex-col text-pink-700 font-semibold">
                  Date
                  <input type="date" name="date" value={form.date} onChange={handleChange} required className="mt-2 p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-pink-700 shadow-sm" />
                </label>
                <label className="flex-1 flex flex-col text-pink-700 font-semibold">
                  Passengers
                  <input type="number" name="passengers" min="1" max="10" value={form.passengers} onChange={handleChange} required className="mt-2 p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-pink-700 shadow-sm" />
                </label>
              </div>
              <button type="submit" className="mt-4 px-8 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-colors shadow-lg text-lg tracking-wide">Book Now</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TicketBooking; 