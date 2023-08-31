import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RedisCommand } from 'utils/redisCommand';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(
    request: Request,
    payload: {
      id: string;
      seq: number;
      iat: number;
      exp: number;
      storeSeq: number;
    },
  ) {
    try {
      const accessToken = request.headers.authorization.split(' ')[1];
      const isVerify = await this.authService.accessTokenVerify(accessToken);

      if (!isVerify) {
        throw new Error('잘못된 접근입니다.');
      }

      const isCheckBlackList = await RedisCommand.get(accessToken);

      // blackList에서 logout 했는지 확인
      if (isCheckBlackList === 'logout') {
        throw new Error('잘못된 접근입니다.');
      }

      return { id: payload.id, seq: payload.seq, storeSeq: payload.storeSeq };
    } catch (error) {
      throw new Error(error);
    }
  }
}
