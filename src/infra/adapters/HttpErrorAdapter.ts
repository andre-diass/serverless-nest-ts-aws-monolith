import { AppError } from '../../errors/base';

export class HttpErrorAdapter {
  private constructor(
    readonly type: string,
    readonly title: string,
    readonly status: number,
    readonly details: any,
    readonly instance: string,
    readonly trace_id?: string,
    readonly problems?: Array<Omit<HttpErrorAdapter, 'problems'>>,
  ) {}

  static from_app_error(
    error: AppError,
    status_code: number,
    request_url: string,
  ) {
    return new HttpErrorAdapter(
      error.error_code,
      error.message,
      status_code,
      error?.details || null,
      request_url,
    );
  }
}
