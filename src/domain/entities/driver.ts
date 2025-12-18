import { Driver } from '@prisma/client';

export type DriverEntity = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const toDriverEntity = (driver: Driver): DriverEntity => ({
  id: driver.id,
  name: driver.name,
  createdAt: driver.createdAt,
  updatedAt: driver.updatedAt,
});

