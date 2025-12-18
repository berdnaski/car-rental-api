import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateDriverUseCase } from '../create-driver.usecase.js';
import type { DriverRepository } from '../../../../domain/repositories/driver.repository.js';
import type { CreateDriverDTO } from '../../../dtos/driver.js';
import type { Driver } from '@prisma/client';

describe('CreateDriverUseCase', () => {
  let useCase: CreateDriverUseCase;
  let mockRepository: DriverRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
      list: vi.fn(),
    } as unknown as DriverRepository;

    useCase = new CreateDriverUseCase(mockRepository);
  });

  it('should create a driver successfully', async () => {
    const driverData: CreateDriverDTO = {
      name: 'John Doe',
    };

    const createdDriver: Driver = {
      id: '123',
      ...driverData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.create).mockResolvedValue(createdDriver);

    const result = await useCase.execute(driverData);

    expect(mockRepository.create).toHaveBeenCalledWith(driverData);
    expect(result).toEqual(createdDriver);
  });
});

