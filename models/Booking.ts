import mongoose, { Schema, model, models } from 'mongoose';

export interface IBooking {
  eventId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  numberOfSeats: number;
  bookingDate: Date;
  status: 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    numberOfSeats: { type: Number, required: true, default: 1 },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
  },
  { timestamps: true }
);

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
