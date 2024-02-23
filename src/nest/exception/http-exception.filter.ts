import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  AppError,
  AuthError,
  DomainError,
  InputError,
  SchemaValidationError,
  UnexpectedError,
} from '../../errors/base';
import { HttpErrorAdapter } from '../../infra/adapters/HttpErrorAdapter';
import { NotFoundError } from 'rxjs';

@Catch(Error)
/*The @Catch(HttpException) decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type Error. Wich means that all my custom Errors must inherit from Error.*/
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof AppError) {
      const build_app_error = (status_code: number) => {
        return HttpErrorAdapter.from_app_error(
          exception,
          status_code,
          request.url,
        );
      };

      if (exception instanceof InputError) {
        const STATUS_CODE = 400;
        return response
          .status(STATUS_CODE)
          .json(build_app_error(STATUS_CODE));
      }

      if (exception instanceof DomainError) {
        const STATUS_CODE = 400;
        return response
          .status(STATUS_CODE)
          .json(build_app_error(STATUS_CODE));
      }

      if (exception instanceof NotFoundError) {
        const STATUS_CODE = 404;
        return response
          .status(STATUS_CODE)
          .json(build_app_error(STATUS_CODE));
      }

      if (exception instanceof AuthError) {
        const STATUS_CODE = 401;
        return response
          .status(STATUS_CODE)
          .json(build_app_error(STATUS_CODE));
      }

      if (exception instanceof UnexpectedError) {
        const STATUS_CODE = 500;
        return response
          .status(STATUS_CODE)
          .json(build_app_error(STATUS_CODE));
      }

      const FALLBACK_STATUS = 403;
      return response
        .status(FALLBACK_STATUS)
        .json(build_app_error(FALLBACK_STATUS));
    }

    if (exception instanceof ZodError) {
      const STATUS_CODE = 400;
      return response
        .status(400)
        .json(
          HttpErrorAdapter.from_app_error(
            new SchemaValidationError(
              'Schema:InvalidSchema',
              'Invalid schema',
              exception.issues,
            ),
            STATUS_CODE,
            request.url,
          ),
        );
    }

    return response.status(500).json({
      statusCode: 500,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
