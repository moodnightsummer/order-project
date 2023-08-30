import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

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
    },
  ) {
    return { id: payload.id, seq: payload.seq };
  }
}
