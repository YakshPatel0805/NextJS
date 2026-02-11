'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  eventId: string;
  availableSeats: number;
}

const BookingForm = ({ eventId, availableSeats }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    numberOfSeats: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventId
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to book event');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-green-800 font-semibold text-lg mb-2">Booking Confirmed!</h3>
        <p className="text-green-700">Check your email for confirmation details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border-2 border-blue-300 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">🎟️ Book Your Spot</h3>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold text-sm">❌ {error}</p>
        </div>
      )}

      <div>
        <label htmlFor="userName" className="block text-base font-semibold text-gray-900 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="userName"
          required
          placeholder="Enter your full name"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-900"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="userEmail" className="block text-base font-semibold text-gray-900 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="userEmail"
          required
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-900"
          value={formData.userEmail}
          onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
        />
        <p className="text-sm text-gray-700 mt-1">Confirmation will be sent to this email</p>
      </div>

      <div>
        <label htmlFor="numberOfSeats" className="block text-base font-semibold text-gray-900 mb-2">
          Number of Seats <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="numberOfSeats"
          min="1"
          max={availableSeats}
          required
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-900"
          value={formData.numberOfSeats}
          onChange={(e) => setFormData({ ...formData, numberOfSeats: parseInt(e.target.value) })}
        />
        <p className="text-sm text-gray-700 mt-1">Maximum {availableSeats} seats available</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? '⏳ Booking...' : '✓ Confirm Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
