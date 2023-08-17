import { Car } from '../models';
import { carsData } from './data';
import mongoose, { MongooseOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const addData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    } as MongooseOptions);

    await Car.insertMany(carsData);
  } catch (e) {
    console.log(e);
  }
};

addData();
