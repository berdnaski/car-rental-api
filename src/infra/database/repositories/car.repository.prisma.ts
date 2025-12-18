import { Car, Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';
import { CreateCarDTO, ListCarsQuery, UpdateCarDTO } from '../../../application/dtos/car.js';
import { CarRepository } from '../../../domain/repositories/car.repository.js';
import { CarFilters } from '../../../shared/filters/car-filters.js';
import { PaginatedResponse, calculatePaginationMeta } from '../../../shared/types/pagination.js';


export class CarRepositoryPrisma implements CarRepository {
  async create(data: CreateCarDTO): Promise<Car> {
    return prisma.car.create({ data });
  }

  async update(id: string, data: UpdateCarDTO): Promise<Car> {
    const updateData: Prisma.CarUpdateInput = {};
    if (data.licensePlate !== undefined) {
      updateData.licensePlate = data.licensePlate;
    }
    if (data.color !== undefined) {
      updateData.color = data.color;
    }
    if (data.brand !== undefined) {
      updateData.brand = data.brand;
    }
    return prisma.car.update({ where: { id }, data: updateData });
  }

  async delete(id: string): Promise<void> {
    await prisma.car.delete({ where: { id } });
  }

  async findById(id: string): Promise<Car | null> {
    return prisma.car.findUnique({ where: { id } });
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    return prisma.car.findUnique({ where: { licensePlate } });
  }

  async list(filters: ListCarsQuery): Promise<PaginatedResponse<Car>> {
    const { page, limit } = filters;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.car.findMany({
        where: CarFilters.buildWhere(filters),
        orderBy: CarFilters.buildOrderBy(),
        skip,
        take: limit,
      }),
      prisma.car.count({
        where: CarFilters.buildWhere(filters),
      }),
    ]);

    return {
      data,
      meta: calculatePaginationMeta(total, page, limit),
    };
  }
}
