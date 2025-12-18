import type { Driver } from '@prisma/client';
import type { UpdateDriverDTO } from '../../dtos/driver.js';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.js';
import { NotFoundError } from '../../../shared/errors/domain-errors.js';

export class UpdateDriverUseCase {
  constructor(private readonly repo: DriverRepository) {}

  async execute(id: string, data: UpdateDriverDTO): Promise<Driver> {
    const current = await this.repo.findById(id);
    if (!current) {
      throw new NotFoundError('Motorista não encontrado');
    }
    return this.repo.update(id, data);
  }
}

