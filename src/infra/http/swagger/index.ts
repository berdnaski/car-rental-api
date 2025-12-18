import type { OpenAPIV3 } from 'openapi-types';
import { carsPaths } from './paths/cars.js';
import { driversPaths } from './paths/drivers.js';
import { carUsagesPaths } from './paths/car-usages.js';
import { Car, CreateCar, UpdateCar, PaginatedCars } from './schemas/cars.js';
import { Driver, CreateDriver, UpdateDriver, PaginatedDrivers } from './schemas/drivers.js';
import {
  CreateCarUsage,
  FinalizeCarUsage,
  CarUsageResponse,
  PaginatedCarUsages,
} from './schemas/car-usages.js';
import {
  PaginationMeta,
  ErrorResponse,
  ValidationErrorResponse,
  BadRequestResponse,
  NotFoundResponse,
  ConflictResponse,
} from './schemas/common.js';

export const openapi: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Car Rental API',
    version: '1.0.0',
    description: 'API for managing cars, drivers, and car usages',
  },
  servers: [{ url: '/' }],
  tags: [
    { name: 'Cars', description: 'Car management' },
    { name: 'Drivers', description: 'Driver management' },
    { name: 'CarUsages', description: 'Car usage records' },
  ],
  paths: {
    ...carsPaths,
    ...driversPaths,
    ...carUsagesPaths,
  },
  components: {
    schemas: {
      // Common schemas
      PaginationMeta,
      ErrorResponse,
      ValidationErrorResponse,
      // Car schemas
      Car,
      CreateCar,
      UpdateCar,
      PaginatedCars,
      // Driver schemas
      Driver,
      CreateDriver,
      UpdateDriver,
      PaginatedDrivers,
      // Car usage schemas
      CreateCarUsage,
      FinalizeCarUsage,
      CarUsageResponse,
      PaginatedCarUsages,
    },
    responses: {
      BadRequest: BadRequestResponse,
      NotFound: NotFoundResponse,
      Conflict: ConflictResponse,
    },
  },
};

