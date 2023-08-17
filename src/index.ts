import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import createHttpError, { isHttpError } from 'http-errors';
import mongoose, { MongooseOptions } from 'mongoose';
import carsRoutes from './routes';

const PORT = process.env.PORT || 5009;
const app = express();

app.use(express.json());
dotenv.config();

app.use('/api/cars', carsRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, '404 - endpoint не существует'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'Что-то пошло не так!';
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  return res.status(statusCode).json({
    message: errorMessage,
  });
});

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  } as MongooseOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('DB connection error', err.message);
  });
