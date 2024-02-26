/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Unauthorized } from '../../errors/user';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new Unauthorized();
    }
    return new Promise((resolve) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err, payload) => {
          if (err) {
            console.error('JWT verification failed:', err);
            resolve(false);
          } else {
            request['user'] = payload;
            console.log('JWT verified successfully');
            resolve(true);
          }
        },
      );
    });
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as { authorization?: string };
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
