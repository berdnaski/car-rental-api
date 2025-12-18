import type { Driver } from '@prisma/client';
import type { CreateDriverDTO } from '../../dtos/driver.js';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.js';

export class CreateDriverUseCase {
  constructor(private readonly repo: DriverRepository) {}

  async execute(data: CreateDriverDTO): Promise<Driver> {
    return this.repo.create(data);
  }
}

