import { Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';
import { CarUsageRepository } from '../../../domain/repositories/car-usage.repository.js';
import { UsageWithRelations } from '../../../domain/entities/car-usage.js';
import { CreateCarUsageDTO, FinalizeCarUsageDTO, ListCarUsagesQuery } from '../../../application/dtos/car-usage.js';
import { CarUsageFilters } from '../../../shared/filters/car-usage-filters.js';
import { PaginatedResponse, calculatePaginationMeta } from '../../../shared/types/pagination.js';

export class CarUsageRepositoryPrisma implements CarUsageRepository {
  async create(data: CreateCarUsageDTO): Promise<UsageWithRelations> {
    return prisma.carUsage.create({ data, include: { car: true, driver: true } });
  }

  async finalize(id: string, data: FinalizeCarUsageDTO): Promise<UsageWithRelations> {
    const updateData: Prisma.CarUsageUpdateInput = {};
    updateData.endDate = data.endDate ?? new Date();
    return prisma.carUsage.update({ where: { id }, data: updateData, include: { car: true, driver: true } });
  }

  async findById(id: string): Promise<UsageWithRelations | null> {
    return prisma.carUsage.findUnique({ where: { id }, include: { car: true, driver: true } });
  }

  async findActiveByCarId(carId: string): Promise<UsageWithRelations | null> {
    return prisma.carUsage.findFirst({ where: { carId, endDate: null }, include: { car: true, driver: true } });
  }

  async findActiveByDriverId(driverId: string): Promise<UsageWithRelations | null> {
    return prisma.carUsage.findFirst({ where: { driverId, endDate: null }, include: { car: true, driver: true } });
  }

  async list(filters: ListCarUsagesQuery): Promise<PaginatedResponse<UsageWithRelations>> {
    const { page, limit } = filters;
    const skip = (page - 1) * limit;

    const where = CarUsageFilters.buildWhere(filters);

    const [data, total] = await Promise.all([
      prisma.carUsage.findMany({
        where,
        include: {
          car: true,
          driver: true,
        },
        orderBy: CarUsageFilters.buildOrderBy(),
        skip,
        take: limit,
      }),
      prisma.carUsage.count({ where }),
    ]);

    return {
      data,
      meta: calculatePaginationMeta(total, page, limit),
    };
  }
}
