import { Prisma } from '@prisma/client';
import { ListDriversQuery } from '../../application/dtos/driver.js';

export class DriverFilters {
  static buildWhere(filters: ListDriversQuery): Prisma.DriverWhereInput {
    const where: Prisma.DriverWhereInput = {};

    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }

    return where;
  }

  static buildOrderBy(): Prisma.DriverOrderByWithRelationInput {
    return { createdAt: 'desc' };
  }
}

