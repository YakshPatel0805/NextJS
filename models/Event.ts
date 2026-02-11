import mongoose, { Schema, model, models } from 'mongoose';

export interface IEvent {
  title: string;
  description: string;
  image: string;
  slug: string;
  time: string;
  venue: string;
  date: Date;
  capacity: number;
  bookedSeats: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    capacity: { type: Number, required: true, default: 100 },
    bookedSeats: { type: Number, default: 0 },
    price: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
