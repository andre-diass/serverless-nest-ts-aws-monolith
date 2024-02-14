import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error) //The @Catch(HttpException) decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type Error. Wich means that all my custom Errors should inherit from Error.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    response.status(400).json({
      statusCode: 400,
      test: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
