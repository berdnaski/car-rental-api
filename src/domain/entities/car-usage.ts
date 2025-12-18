import type { Prisma } from '@prisma/client';
import { toDriverEntity, type DriverEntity } from './driver.js';
import { CarEntity, toCarEntity } from './car.js';

export type CarUsageEntity = {
  id: string;
  startDate: Date;
  endDate: Date | null;
  reason: string;
  car: CarEntity;
  driver: DriverEntity;
  createdAt: Date;
  updatedAt: Date;
};

export type UsageWithRelations = Prisma.CarUsageGetPayload<{ include: { car: true; driver: true } }>;

export const toCarUsageEntity = (u: UsageWithRelations): CarUsageEntity => ({
  id: u.id,
  startDate: u.startDate,
  endDate: u.endDate ?? null,
  reason: u.reason,
  car: toCarEntity(u.car),
  driver: toDriverEntity(u.driver),
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

