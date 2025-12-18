import type { OpenAPIV3 } from 'openapi-types';
import { PaginationQueryParams, BadRequestResponse, NotFoundResponse } from '../schemas/common.js';

export const driversPaths: OpenAPIV3.PathsObject = {
  '/drivers': {
    get: {
      tags: ['Drivers'],
      summary: 'List drivers',
      operationId: 'listDrivers',
      parameters: [
        ...PaginationQueryParams,
        { name: 'name', in: 'query', schema: { type: 'string' }, description: 'Filter by name' },
      ],
      responses: {
        '200': {
          description: 'Paginated list of drivers',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PaginatedDrivers' },
            },
          },
        },
        '400': BadRequestResponse,
      },
    },
    post: {
      tags: ['Drivers'],
      summary: 'Create driver',
      operationId: 'createDriver',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateDriver' },
            examples: { default: { value: { name: 'John Doe' } } },
          },
        },
      },
      responses: {
        '201': {
          description: 'Created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Driver' },
            },
          },
        },
        '400': BadRequestResponse,
      },
    },
  },
  '/drivers/{id}': {
    get: {
      tags: ['Drivers'],
      summary: 'Get driver by ID',
      operationId: 'getDriverById',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Driver' },
            },
          },
        },
        '404': NotFoundResponse,
      },
    },
    put: {
      tags: ['Drivers'],
      summary: 'Update driver',
      operationId: 'updateDriver',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateDriver' },
            examples: { default: { value: { name: 'Jane Doe' } } },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Driver' },
            },
          },
        },
        '404': NotFoundResponse,
        '400': BadRequestResponse,
      },
    },
    delete: {
      tags: ['Drivers'],
      summary: 'Delete driver',
      operationId: 'deleteDriver',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
      responses: {
        '204': { description: 'No content' },
        '404': NotFoundResponse,
      },
    },
  },
};

