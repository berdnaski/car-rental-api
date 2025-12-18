import type { DriverRepository } from '../../../domain/repositories/driver.repository.js';
import { NotFoundError } from '../../../shared/errors/domain-errors.js';

export class DeleteDriverUseCase {
  constructor(private readonly repo: DriverRepository) {}

  async execute(id: string): Promise<void> {
    const current = await this.repo.findById(id);
    if (!current) {
      throw new NotFoundError('Motorista não encontrado');
    }
    await this.repo.delete(id);
  }
}

