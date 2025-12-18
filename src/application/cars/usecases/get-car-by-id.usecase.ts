import type { Car } from '@prisma/client';
import type { CarRepository } from '../../../domain/repositories/car.repository.js';
import { NotFoundError } from '../../../shared/errors/domain-errors.js';

export class GetCarByIdUseCase {
  constructor(private readonly repo: CarRepository) {}

  async execute(id: string): Promise<Car> {
    const car = await this.repo.findById(id);
    if (!car) {
      throw new NotFoundError('Carro não encontrado');
    }
    return car;
  }
}

