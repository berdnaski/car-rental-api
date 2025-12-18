import type { Driver } from '@prisma/client';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.js';
import type { ListDriversQuery } from '../../dtos/driver.js';
import type { PaginatedResponse } from '../../../shared/types/pagination.js';

export class ListDriversUseCase {
  constructor(private readonly repo: DriverRepository) {}

  async execute(filters: ListDriversQuery): Promise<PaginatedResponse<Driver>> {
    return this.repo.list(filters);
  }
}

