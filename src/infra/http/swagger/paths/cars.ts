import type { OpenAPIV3 } from 'openapi-types';
import { PaginationQueryParams, BadRequestResponse, NotFoundResponse, ConflictResponse } from '../schemas/common.js';

export const carsPaths: OpenAPIV3.PathsObject = {
  '/cars': {
    get: {
      tags: ['Cars'],
      summary: 'List cars',
      operationId: 'listCars',
      parameters: [
        ...PaginationQueryParams,
        { name: 'color', in: 'query', schema: { type: 'string' }, description: 'Filter by color' },
        { name: 'brand', in: 'query', schema: { type: 'string' }, description: 'Filter by brand' },
      ],
      responses: {
        '200': {
          description: 'Paginated list of cars',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaginatedCars' },
            },
          },
        },
        '400': BadRequestResponse,
      },
    },
    post: {
      tags: ['Cars'],
      summary: 'Create car',
      operationId: 'createCar',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCar' },
            examples: {
              default: {
                value: { licensePlate: 'ABC1234', color: 'Silver', brand: 'Toyota' },
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
              schema: { $ref: '#/components/schemas/Car' },
            },
          },
        },
        '409': ConflictResponse,
        '400': BadRequestResponse,
      },
    },
  },
  '/cars/{id}': {
    get: {
      tags: ['Cars'],
      summary: 'Get car by ID',
      operationId: 'getCarById',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Car' },
            },
          },
        },
        '404': NotFoundResponse,
      },
    },
    put: {
      tags: ['Cars'],
      summary: 'Update car',
      operationId: 'updateCar',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateCar' },
            examples: { default: { value: { color: 'Black' } } },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Car' },
            },
          },
        },
        '404': NotFoundResponse,
        '409': ConflictResponse,
        '400': BadRequestResponse,
      },
    },
    delete: {
      tags: ['Cars'],
      summary: 'Delete car',
      operationId: 'deleteCar',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      responses: {
        '204': { description: 'No content' },
        '404': NotFoundResponse,
      },
    },
  },
};

