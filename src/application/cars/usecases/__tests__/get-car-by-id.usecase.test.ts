import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetCarByIdUseCase } from '../get-car-by-id.usecase.js';
import type { CarRepository } from '../../../../domain/repositories/car.repository.js';
import { NotFoundError } from '../../../../shared/errors/domain-errors.js';
import type { Car } from '@prisma/client';

describe('GetCarByIdUseCase', () => {
  let useCase: GetCarByIdUseCase;
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

    useCase = new GetCarByIdUseCase(mockRepository);
  });

  it('should return car when found', async () => {
    const car: Car = {
      id: '123',
      licensePlate: 'ABC1234',
      color: 'Silver',
      brand: 'Toyota',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findById).mockResolvedValue(car);

    const result = await useCase.execute('123');

    expect(mockRepository.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(car);
  });

  it('should throw NotFoundError when car does not exist', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);

    await expect(useCase.execute('123')).rejects.toThrow(NotFoundError);
    expect(mockRepository.findById).toHaveBeenCalledWith('123');
  });
});

