import type { Driver } from '@prisma/client';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.js';
import { NotFoundError } from '../../../shared/errors/domain-errors.js';

export class GetDriverByIdUseCase {
  constructor(private readonly repo: DriverRepository) {}

  async execute(id: string): Promise<Driver> {
    const driver = await this.repo.findById(id);
    if (!driver) {
      throw new NotFoundError('Motorista não encontrado');
    }
    return driver;
  }
}

