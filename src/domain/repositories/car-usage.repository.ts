import { CreateCarUsageDTO, FinalizeCarUsageDTO, ListCarUsagesQuery } from '../../application/dtos/car-usage.js';
import { PaginatedResponse } from '../../shared/types/pagination.js';
import { UsageWithRelations } from '../entities/car-usage.js';

export interface CarUsageRepository {
  create(data: CreateCarUsageDTO): Promise<UsageWithRelations>;
  finalize(id: string, data: FinalizeCarUsageDTO): Promise<UsageWithRelations>;
  findById(id: string): Promise<UsageWithRelations | null>;
  findActiveByCarId(carId: string): Promise<UsageWithRelations | null>;
  findActiveByDriverId(driverId: string): Promise<UsageWithRelations | null>;
  list(filters: ListCarUsagesQuery): Promise<PaginatedResponse<UsageWithRelations>>;
}
