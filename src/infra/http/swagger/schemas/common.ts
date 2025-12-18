import type { OpenAPIV3 } from 'openapi-types';

export const PaginationMeta: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    page: { type: 'integer', minimum: 1, description: 'Current page number' },
    limit: { type: 'integer', minimum: 1, description: 'Items per page' },
    total: { type: 'integer', minimum: 0, description: 'Total number of items' },
    totalPages: { type: 'integer', minimum: 0, description: 'Total number of pages' },
  },
  required: ['page', 'limit', 'total', 'totalPages'],
};

export const ErrorResponse: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  required: ['message'],
  example: { message: 'Resource not found' },
};

export const ValidationErrorResponse: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    errors: {
      type: 'object',
      properties: {
        formErrors: { type: 'array', items: { type: 'string' } },
        fieldErrors: {
          type: 'object',
          additionalProperties: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
      required: ['formErrors', 'fieldErrors'],
    },
  },
  required: ['errors'],
  example: {
    errors: {
      formErrors: [],
      fieldErrors: {
        licensePlate: ['licensePlate is required'],
      },
    },
  },
};

export const PaginationQueryParams: OpenAPIV3.ParameterObject[] = [
  {
    name: 'page',
    in: 'query',
    schema: { type: 'integer', minimum: 1, default: 1 },
    description: 'Page number',
  },
  {
    name: 'limit',
    in: 'query',
    schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    description: 'Items per page',
  },
];

export const BadRequestResponse: OpenAPIV3.ResponseObject = {
  description: 'Bad request',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ValidationErrorResponse' },
    },
  },
};

export const NotFoundResponse: OpenAPIV3.ResponseObject = {
  description: 'Not found',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' },
    },
  },
};

export const ConflictResponse: OpenAPIV3.ResponseObject = {
  description: 'Conflict',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' },
    },
  },
};

