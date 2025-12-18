import type { CarRepository } from '../../../domain/repositories/car.repository.js';
import type { ListCarsQuery } from '../../dtos/car.js';
import type { PaginatedResponse } from '../../../shared/types/pagination.js';
import type { Car } from '@prisma/client';

export class ListCarsUseCase {
  constructor(private readonly repo: CarRepository) {}

  async execute(filters: ListCarsQuery): Promise<PaginatedResponse<Car>> {
    return this.repo.list(filters);
  }
}

