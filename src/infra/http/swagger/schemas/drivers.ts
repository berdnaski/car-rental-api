import type { OpenAPIV3 } from 'openapi-types';

export const Driver: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
  required: ['id', 'name', 'createdAt', 'updatedAt'],
};

export const CreateDriver: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: ['name'],
};

export const UpdateDriver: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
};

export const PaginatedDrivers: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: { $ref: '#/components/schemas/Driver' },
    },
    meta: { $ref: '#/components/schemas/PaginationMeta' },
  },
  required: ['data', 'meta'],
};

