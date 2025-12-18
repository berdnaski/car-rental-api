import type { UsageWithRelations } from '../../../domain/entities/car-usage.js';
import type { CarUsageRepository } from '../../../domain/repositories/car-usage.repository.js';
import type { FinalizeCarUsageDTO } from '../../dtos/car-usage.js';
import { NotFoundError, ConflictError } from '../../../shared/errors/domain-errors.js';

export class FinalizeCarUsageUseCase {
  constructor(private readonly repo: CarUsageRepository) {}

  async execute(id: string, data: FinalizeCarUsageDTO): Promise<UsageWithRelations> {
    const current = await this.repo.findById(id);
    if (!current) {
      throw new NotFoundError('Uso de automóvel não encontrado');
    }
    if (current.endDate) {
      throw new ConflictError('Uso já finalizado');
    }
    return this.repo.finalize(id, data);
  }
}
