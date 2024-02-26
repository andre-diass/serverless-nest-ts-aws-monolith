import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthPayload = {
  id: string;
  email: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Auth = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    request.user.iat = new Date(request.user.iat * 1000);

    return request.user as AuthPayload;
  },
);
