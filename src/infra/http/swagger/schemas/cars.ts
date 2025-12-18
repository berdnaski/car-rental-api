import type { OpenAPIV3 } from 'openapi-types';

export const Car: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    licensePlate: { type: 'string' },
    color: { type: 'string' },
    brand: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
  required: ['id', 'licensePlate', 'color', 'brand', 'createdAt', 'updatedAt'],
};

export const CreateCar: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    licensePlate: { type: 'string' },
    color: { type: 'string' },
    brand: { type: 'string' },
  },
  required: ['licensePlate', 'color', 'brand'],
};

export const UpdateCar: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    licensePlate: { type: 'string' },
    color: { type: 'string' },
    brand: { type: 'string' },
  },
};

export const PaginatedCars: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: { $ref: '#/components/schemas/Car' },
    },
    meta: { $ref: '#/components/schemas/PaginationMeta' },
  },
  required: ['data', 'meta'],
};

