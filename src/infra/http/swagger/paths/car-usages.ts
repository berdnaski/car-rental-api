import type { OpenAPIV3 } from 'openapi-types';
import { PaginationQueryParams, BadRequestResponse, NotFoundResponse, ConflictResponse } from '../schemas/common.js';

export const carUsagesPaths: OpenAPIV3.PathsObject = {
  '/car-usages': {
    get: {
      tags: ['CarUsages'],
      summary: 'List car usages',
      operationId: 'listCarUsages',
      parameters: [
        ...PaginationQueryParams,
        { name: 'driverName', in: 'query', schema: { type: 'string' }, description: 'Filter by driver name' },
        { name: 'carBrand', in: 'query', schema: { type: 'string' }, description: 'Filter by car brand' },
        { name: 'carColor', in: 'query', schema: { type: 'string' }, description: 'Filter by car color' },
        { name: 'activeOnly', in: 'query', schema: { type: 'boolean' }, description: 'Only active usages' },
      ],
      responses: {
        '200': {
          description: 'Paginated list of car usages',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaginatedCarUsages' },
            },
          },
        },
        '400': BadRequestResponse,
      },
    },
    post: {
      tags: ['CarUsages'],
      summary: 'Create car usage',
      operationId: 'createCarUsage',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCarUsage' },
            examples: {
              default: {
                value: {
                  carId: 'b4fbe9f2-4b1c-4e9e-b6c2-3f9c2e4f9a11',
                  driverId: 'a1c3d5e7-8f9a-4b2c-9d0e-1f2a3b4c5d6e',
                  startDate: '2025-12-02T10:00:00Z',
                  reason: 'Client visit',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CarUsageResponse' },
            },
          },
        },
        '409': ConflictResponse,
        '400': BadRequestResponse,
      },
    },
  },
  '/car-usages/{id}/finalize': {
    post: {
      tags: ['CarUsages'],
      summary: 'Finalize car usage',
      operationId: 'finalizeCarUsage',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FinalizeCarUsage' },
            examples: { default: { value: { endDate: '2025-12-03T18:00:00Z' } } },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CarUsageResponse' },
            },
          },
        },
        '404': NotFoundResponse,
        '409': ConflictResponse,
        '400': BadRequestResponse,
      },
    },
  },
};

