import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCarUseCase } from '../create-car.usecase.js';
import type { CarRepository } from '../../../../domain/repositories/car.repository.js';
import type { CreateCarDTO } from '../../../dtos/car.js';
import { ConflictError } from '../../../../shared/errors/domain-errors.js';
import type { Car } from '@prisma/client';

describe('CreateCarUseCase', () => {
  let useCase: CreateCarUseCase;
  let mockRepository: CarRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
      findByLicensePlate: vi.fn(),
      list: vi.fn(),
    } as unknown as CarRepository;

    useCase = new CreateCarUseCase(mockRepository);
  });

  it('should create a car when license plate does not exist', async () => {
    const carData: CreateCarDTO = {
      licensePlate: 'ABC1234',
      color: 'Silver',
      brand: 'Toyota',
    };

    const createdCar: Car = {
      id: '123',
      ...carData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findByLicensePlate).mockResolvedValue(null);
    vi.mocked(mockRepository.create).mockResolvedValue(createdCar);

    const result = await useCase.execute(carData);

    expect(mockRepository.findByLicensePlate).toHaveBeenCalledWith('ABC1234');
    expect(mockRepository.create).toHaveBeenCalledWith(carData);
    expect(result).toEqual(createdCar);
  });

  it('should throw ConflictError when license plate already exists', async () => {
    const carData: CreateCarDTO = {
      licensePlate: 'ABC1234',
      color: 'Silver',
      brand: 'Toyota',
    };

    const existingCar: Car = {
      id: '123',
      ...carData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findByLicensePlate).mockResolvedValue(existingCar);

    await expect(useCase.execute(carData)).rejects.toThrow(ConflictError);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});

