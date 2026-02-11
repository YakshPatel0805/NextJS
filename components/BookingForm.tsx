'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentForm from './PaymentForm';

interface Props {
  eventId: string;
  availableSeats: number;
  eventPrice: number;
}

const BookingForm = ({ eventId, availableSeats, eventPrice }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    numberOfSeats: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

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

      // Show payment form
      setBookingId(data.data._id);
      setTotalAmount(data.data.paymentAmount);
      setShowPayment(true);
      setLoading(false);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSuccess(true);
    setTimeout(() => {
      router.refresh();
    }, 2000);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setError('Payment cancelled. Your booking is pending payment.');
  };

  if (success) {
    return (
      <div className="form-success">
        <h3 className="form-success-title">✓ Booking Confirmed & Payment Successful!</h3>
        <p className="form-success-text">Check your email for confirmation details.</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container space-y-5">
        <h3 className="form-title text-2xl">🎟️ Book Your Spot</h3>

        {error && (
          <div className="form-error">
            <p className="form-error-text">❌ {error}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="userName" className="form-label form-label-required">
            Full Name
          </label>
          <input
            type="text"
            id="userName"
            required
            placeholder="Enter your full name"
            className="form-input"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userEmail" className="form-label form-label-required">
            Email Address
          </label>
          <input
            type="email"
            id="userEmail"
            required
            placeholder="your.email@example.com"
            className="form-input"
            value={formData.userEmail}
            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
          />
          <p className="form-helper-text">Confirmation will be sent to this email</p>
        </div>

        <div className="form-group">
          <label htmlFor="numberOfSeats" className="form-label form-label-required">
            Number of Seats
          </label>
          <input
            type="number"
            id="numberOfSeats"
            min="1"
            max={availableSeats}
            required
            className="form-input"
            value={formData.numberOfSeats}
            onChange={(e) => setFormData({ ...formData, numberOfSeats: parseInt(e.target.value) })}
          />
          <p className="form-helper-text">Maximum {availableSeats} seats available</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-semibold">Price per seat:</span>
            <span className="text-gray-900 font-bold">₹{eventPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Total Amount:</span>
            <span className="text-2xl text-blue-600 font-bold">
              ₹{(eventPrice * formData.numberOfSeats).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="form-button"
        >
          {loading ? '⏳ Processing...' : '→ Proceed to Payment'}
        </button>
      </form>

      {showPayment && (
        <PaymentForm
          bookingId={bookingId}
          amount={totalAmount}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </>
  );
};

export default BookingForm;
