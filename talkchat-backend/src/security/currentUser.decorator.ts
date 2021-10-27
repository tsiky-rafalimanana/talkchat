import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../models/user/entity/user.entity';
import { extractBearerToken } from '../utils/authUtils';
import { jwtDecode } from '../utils/jwtUtils';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const token = extractBearerToken(request);
      const { id } = jwtDecode(token);
      const user = await User.findOne({ id });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      return error;
    }
  },
);
