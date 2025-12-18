import { Prisma } from '@prisma/client';
import { ListCarsQuery } from '../../application/dtos/car.js';

export class CarFilters {
  static buildWhere(filters: ListCarsQuery): Prisma.CarWhereInput {
    const where: Prisma.CarWhereInput = {};

    if (filters.color) {
      where.color = { contains: filters.color, mode: 'insensitive' };
    }

    if (filters.brand) {
      where.brand = { contains: filters.brand, mode: 'insensitive' };
    }

    return where;
  }

  static buildOrderBy(): Prisma.CarOrderByWithRelationInput {
    return { createdAt: 'desc' };
  }
}

