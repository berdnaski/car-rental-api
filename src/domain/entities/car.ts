import { Car } from '@prisma/client';

export type CarEntity = {
  id: string;
  licensePlate: string;
  color: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
};

export const toCarEntity = (car: Car): CarEntity => ({
  id: car.id,
  licensePlate: car.licensePlate,
  color: car.color,
  brand: car.brand,
  createdAt: car.createdAt,
  updatedAt: car.updatedAt,
});

