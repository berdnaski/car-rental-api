import { NotFoundError, ConflictError, ValidationError } from '../errors/domain-errors.js';

export function getHttpStatusCode(error: unknown): number {
  if (error instanceof NotFoundError) {
    return 404;
  }
  if (error instanceof ConflictError) {
    return 409;
  }
  if (error instanceof ValidationError) {
    return 400;
  }
  return 500;
}

