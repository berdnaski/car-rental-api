import { Driver, Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';
import { DriverRepository } from '../../../domain/repositories/driver.repository.js';
import { CreateDriverDTO, UpdateDriverDTO, ListDriversQuery } from '../../../application/dtos/driver.js';
import { DriverFilters } from '../../../shared/filters/driver-filters.js';
import { PaginatedResponse, calculatePaginationMeta } from '../../../shared/types/pagination.js';

export class DriverRepositoryPrisma implements DriverRepository {
  async create(data: CreateDriverDTO): Promise<Driver> {
    return prisma.driver.create({ data });
  }

  async update(id: string, data: UpdateDriverDTO): Promise<Driver> {
    const updateData: Prisma.DriverUpdateInput = {};
    if (data.name !== undefined) updateData.name = data.name;
    return prisma.driver.update({ where: { id }, data: updateData });
  }

  async delete(id: string): Promise<void> {
    await prisma.driver.delete({ where: { id } });
  }

  async findById(id: string): Promise<Driver | null> {
    return prisma.driver.findUnique({ where: { id } });
  }

  async list(filters: ListDriversQuery): Promise<PaginatedResponse<Driver>> {
    const { page, limit } = filters;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.driver.findMany({
        where: DriverFilters.buildWhere(filters),
        orderBy: DriverFilters.buildOrderBy(),
        skip,
        take: limit,
      }),
      prisma.driver.count({
        where: DriverFilters.buildWhere(filters),
      }),
    ]);

    return {
      data,
      meta: calculatePaginationMeta(total, page, limit),
    };
  }
}

