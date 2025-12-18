import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCarUsageUseCase } from '../create-car-usage.usecase.js';
import type { CarUsageRepository } from '../../../../domain/repositories/car-usage.repository.js';
import type { CreateCarUsageDTO } from '../../../dtos/car-usage.js';
import { ConflictError } from '../../../../shared/errors/domain-errors.js';
import type { UsageWithRelations } from '../../../../domain/entities/car-usage.js';

describe('CreateCarUsageUseCase', () => {
  let useCase: CreateCarUsageUseCase;
  let mockRepository: CarUsageRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      finalize: vi.fn(),
      findById: vi.fn(),
      findActiveByCarId: vi.fn(),
      findActiveByDriverId: vi.fn(),
      list: vi.fn(),
    } as unknown as CarUsageRepository;

    useCase = new CreateCarUsageUseCase(mockRepository);
  });

  it('should create car usage when car and driver are available', async () => {
    const usageData: CreateCarUsageDTO = {
      carId: 'car-123',
      driverId: 'driver-123',
      startDate: new Date(),
      reason: 'Client visit',
    };

    const createdUsage = {
      id: 'usage-123',
      ...usageData,
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      car: {} as any,
      driver: {} as any,
    } as UsageWithRelations;

    vi.mocked(mockRepository.findActiveByCarId).mockResolvedValue(null);
    vi.mocked(mockRepository.findActiveByDriverId).mockResolvedValue(null);
    vi.mocked(mockRepository.create).mockResolvedValue(createdUsage);

    const result = await useCase.execute(usageData);

    expect(mockRepository.findActiveByCarId).toHaveBeenCalledWith('car-123');
    expect(mockRepository.findActiveByDriverId).toHaveBeenCalledWith('driver-123');
    expect(mockRepository.create).toHaveBeenCalledWith(usageData);
    expect(result).toEqual(createdUsage);
  });

  it('should throw ConflictError when car is already in use', async () => {
    const usageData: CreateCarUsageDTO = {
      carId: 'car-123',
      driverId: 'driver-123',
      startDate: new Date(),
      reason: 'Client visit',
    };

    const activeUsage = {
      id: 'usage-123',
      carId: 'car-123',
      endDate: null,
    } as UsageWithRelations;

    vi.mocked(mockRepository.findActiveByCarId).mockResolvedValue(activeUsage);

    await expect(useCase.execute(usageData)).rejects.toThrow(ConflictError);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw ConflictError when driver is already using a car', async () => {
    const usageData: CreateCarUsageDTO = {
      carId: 'car-123',
      driverId: 'driver-123',
      startDate: new Date(),
      reason: 'Client visit',
    };

    const activeUsage = {
      id: 'usage-123',
      driverId: 'driver-123',
      endDate: null,
    } as UsageWithRelations;

    vi.mocked(mockRepository.findActiveByCarId).mockResolvedValue(null);
    vi.mocked(mockRepository.findActiveByDriverId).mockResolvedValue(activeUsage);

    await expect(useCase.execute(usageData)).rejects.toThrow(ConflictError);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});

