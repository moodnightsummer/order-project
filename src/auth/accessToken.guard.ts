import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { IS_COMMON_AUTH_KEY, IS_PUBLIC_KEY } from 'src/config/customMetadata';
import { CustomResponseDto } from 'src/dto/customResponseDto';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(info: any, data: any, err: any, context: any, status: any) {
    if (err instanceof TokenExpiredError) {
      return new CustomResponseDto(403, {
        message: process.env.COMMON_RESPONSE,
      });
    }

    if (err instanceof JsonWebTokenError) {
      return new CustomResponseDto(403, {
        message: process.env.COMMON_RESPONSE,
      });
    }
    return super.handleRequest(info, data, err, context, status);
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isCommonAuth = this.reflector.getAllAndOverride<boolean>(
      IS_COMMON_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isCommonAuth) {
      context.switchToHttp().getRequest().customCommonAuth = true;
    }

    return super.canActivate(context);
  }
}
