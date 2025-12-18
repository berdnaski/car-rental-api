import type { CarUsageRepository } from '../../../domain/repositories/car-usage.repository.js';
import type { UsageWithRelations } from '../../../domain/entities/car-usage.js';
import { CreateCarUsageDTO } from '../../dtos/car-usage.js';
import { ConflictError } from '../../../shared/errors/domain-errors.js';

export class CreateCarUsageUseCase {
  constructor(private readonly repo: CarUsageRepository) {}

  async execute(data: CreateCarUsageDTO): Promise<UsageWithRelations> {
    const activeCar = await this.repo.findActiveByCarId(data.carId);
    if (activeCar) {
      throw new ConflictError('Este automóvel já está em utilização');
    }

    const activeDriver = await this.repo.findActiveByDriverId(data.driverId);
    if (activeDriver) {
      throw new ConflictError('Este motorista já está utilizando um automóvel');
    }

    return this.repo.create(data);
  }
}
