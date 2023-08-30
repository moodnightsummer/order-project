import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { CustomResponseDto } from 'src/dto/customResponseDto';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest(info: any, data: any, err: any, context: any, status: any) {
    if (err instanceof TokenExpiredError) {
      throw new CustomResponseDto(403, { message: 'TokenExpiredError' });
    }

    if (err instanceof JsonWebTokenError) {
      throw new CustomResponseDto(403, { message: 'TokenExpiredError' });
    }

    return super.handleRequest(info, data, err, context, status);
  }
}
