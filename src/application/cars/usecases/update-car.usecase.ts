import type { Car } from '@prisma/client';
import type { CarRepository } from '../../../domain/repositories/car.repository.js';
import type { UpdateCarDTO } from '../../dtos/car.js';
import { NotFoundError, ConflictError } from '../../../shared/errors/domain-errors.js';

export class UpdateCarUseCase {
  constructor(private readonly repo: CarRepository) {}

  async execute(id: string, data: UpdateCarDTO): Promise<Car> {
    const current = await this.repo.findById(id);
    if (!current) {
      throw new NotFoundError('Carro não encontrado');
    }

    if (data.licensePlate && data.licensePlate !== current.licensePlate) {
      const duplicate = await this.repo.findByLicensePlate(data.licensePlate);
      if (duplicate) {
        throw new ConflictError('Já existe um carro com esta nova placa');
      }
    }

    return this.repo.update(id, data);
  }
}

