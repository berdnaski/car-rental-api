import { Driver } from '@prisma/client';
import { CreateDriverDTO, UpdateDriverDTO, ListDriversQuery } from '../../application/dtos/driver.js';
import { PaginatedResponse } from '../../shared/types/pagination.js';

export interface DriverRepository {
  create(data: CreateDriverDTO): Promise<Driver>;
  update(id: string, data: UpdateDriverDTO): Promise<Driver>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Driver | null>;
  list(filters: ListDriversQuery): Promise<PaginatedResponse<Driver>>;
}

