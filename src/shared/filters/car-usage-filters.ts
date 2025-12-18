import { Prisma } from '@prisma/client';
import { ListCarUsagesQuery } from '../../application/dtos/car-usage.js';

export class CarUsageFilters {
  static buildWhere(filters: ListCarUsagesQuery): Prisma.CarUsageWhereInput {
    const where: Prisma.CarUsageWhereInput = {};

    if (filters.activeOnly) {
      where.endDate = null;
    }

    if (filters.driverName) {
      where.driver = { name: { contains: filters.driverName, mode: 'insensitive' } };
    }

    if (filters.carBrand || filters.carColor) {
      where.car = {};
      if (filters.carBrand) {
        where.car.brand = { contains: filters.carBrand, mode: 'insensitive' };
      }
      if (filters.carColor) {
        where.car.color = { contains: filters.carColor, mode: 'insensitive' };
      }
    }

    return where;
  }

  static buildOrderBy(): Prisma.CarUsageOrderByWithRelationInput {
    return { startDate: 'desc' };
  }
}

