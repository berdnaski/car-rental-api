import { describe, it, expect } from 'vitest';
import { getHttpStatusCode } from '../error-handler.js';
import { NotFoundError, ConflictError, ValidationError } from '../../errors/domain-errors.js';

describe('getHttpStatusCode', () => {
  it('should return 404 for NotFoundError', () => {
    const error = new NotFoundError('Not found');
    expect(getHttpStatusCode(error)).toBe(404);
  });

  it('should return 409 for ConflictError', () => {
    const error = new ConflictError('Conflict');
    expect(getHttpStatusCode(error)).toBe(409);
  });

  it('should return 400 for ValidationError', () => {
    const error = new ValidationError('Validation failed');
    expect(getHttpStatusCode(error)).toBe(400);
  });

  it('should return 500 for unknown errors', () => {
    const error = new Error('Unknown error');
    expect(getHttpStatusCode(error)).toBe(500);
  });
});

