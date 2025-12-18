import type { OpenAPIV3 } from 'openapi-types';

export const CreateCarUsage: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    carId: { type: 'string', format: 'uuid' },
    driverId: { type: 'string', format: 'uuid' },
    startDate: { type: 'string', format: 'date-time' },
    reason: { type: 'string' },
  },
  required: ['carId', 'driverId', 'startDate', 'reason'],
};

export const FinalizeCarUsage: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    endDate: { type: 'string', format: 'date-time' },
  },
};

export const CarUsageResponse: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time', nullable: true },
    reason: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    car: { $ref: '#/components/schemas/Car' },
    driver: { $ref: '#/components/schemas/Driver' },
  },
  required: ['id', 'startDate', 'reason', 'createdAt', 'updatedAt', 'car', 'driver'],
};

export const PaginatedCarUsages: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: { $ref: '#/components/schemas/CarUsageResponse' },
    },
    meta: { $ref: '#/components/schemas/PaginationMeta' },
  },
  required: ['data', 'meta'],
};

