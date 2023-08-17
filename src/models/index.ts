import mongoose, { Schema } from 'mongoose';

const CarSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    yearOfManufacturing: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      get: (v: number) => (v / 100).toFixed(2),
      set: (v: number) => v * 100,
    },
  },
  { timestamps: true, toJSON: { getters: true } },
);

export const Car = mongoose.model('Car', CarSchema);
