import type { Car } from '@prisma/client';
import type { CarRepository } from '../../../domain/repositories/car.repository.js';
import type { CreateCarDTO } from '../../dtos/car.js';
import { ConflictError } from '../../../shared/errors/domain-errors.js';

export class CreateCarUseCase {
  constructor(private readonly repo: CarRepository) {}

  async execute(data: CreateCarDTO): Promise<Car> {
    const existing = await this.repo.findByLicensePlate(data.licensePlate);
    if (existing) {
      throw new ConflictError('Já existe um carro com esta placa');
    }
    return this.repo.create(data);
  }
}

