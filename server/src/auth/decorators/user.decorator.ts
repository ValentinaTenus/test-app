import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Users } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: keyof Users, cxt: ExecutionContext) => {
    const request = cxt.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
