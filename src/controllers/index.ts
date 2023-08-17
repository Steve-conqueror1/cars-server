import { Request, Response, NextFunction } from 'express';
import { Car } from '../models';
import createHttpError from 'http-errors';

export const getCars = async (req: Request, res: Response, next: NextFunction) => {
  const { sort, order } = req.query;

  let carsSort: { [key: string]: 1 | -1 } = {};
  if (sort) {
    if (order === 'dec') {
      carsSort[sort as string] = -1;
    } else {
      carsSort[sort as string] = 1;
    }
  }

  try {
    const cars = await Car.find().sort(carsSort);
    res.status(200).json(cars);
  } catch (e) {
    next(e);
  }
};

export const addCar = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  try {
    const newCar = await Car.create(body);
    res.status(201).json(newCar);
  } catch (e) {
    next(e);
  }
};

export const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
  const { carId } = req.params;
  try {
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      throw createHttpError(404, 'Car not found');
    }

    res.status(201).json({ message: 'автомобиль удален' });
  } catch (e) {
    next(e);
  }
};
