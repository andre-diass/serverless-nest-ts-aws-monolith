import { ZodIssue } from 'zod';

type ErrorCodeFormat = `${string}:${string}`;

export class AppError extends Error {
  constructor(
    readonly error_code: ErrorCodeFormat,
    readonly message: string,
    readonly details?: unknown,
  ) {
    super(message);
  }
}

export class SchemaValidationError extends AppError {
  constructor(
    code: ErrorCodeFormat,
    message: string,
    context: ZodIssue[],
  ) {
    super(
      code,
      message,
      context.map((x) => ({ ...x, path: x.path.join('.') })),
    );
  }
}
export class InputError extends AppError {}

export class NotFoundError extends AppError {}

export class DomainError extends AppError {}

export class AuthError extends AppError {}

export class UnexpectedError extends AppError {}
