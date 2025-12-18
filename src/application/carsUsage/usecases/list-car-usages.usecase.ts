import type { CarUsageRepository } from '../../../domain/repositories/car-usage.repository.js';
import type { UsageWithRelations } from '../../../domain/entities/car-usage.js';
import type { ListCarUsagesQuery } from '../../dtos/car-usage.js';
import type { PaginatedResponse } from '../../../shared/types/pagination.js';

export class ListCarUsagesUseCase {
  constructor(private readonly repo: CarUsageRepository) {}

  async execute(filters: ListCarUsagesQuery): Promise<PaginatedResponse<UsageWithRelations>> {
    return this.repo.list(filters);
  }
}
