import type { CarRepository } from '../../../domain/repositories/car.repository.js';
import { NotFoundError } from '../../../shared/errors/domain-errors.js';

export class DeleteCarUseCase {
  constructor(private readonly repo: CarRepository) {}

  async execute(id: string): Promise<void> {
    const current = await this.repo.findById(id);
    if (!current) {
      throw new NotFoundError('Carro não encontrado');
    }
    await this.repo.delete(id);
  }
}

