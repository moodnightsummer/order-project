import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import RedisClient from '@redis/client/dist/lib/client';
import * as bcrypt from 'bcrypt';
import exp from 'constants';
import { UserRepository } from 'src/database/repository/user.repository';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import { RedisCommand } from 'utils/redisCommand';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async existsUser(id: string) {
    return await this.userRepo.findById(id);
  }

  createAccessToken(id: string, seq: number, storeSeq: number): string {
    return this.jwtService.sign({ id, seq, storeSeq }, { expiresIn: '2h' });
  }

  createRefreshToken(id: string, seq: number): string {
    return this.jwtService.sign({ id, seq }, { expiresIn: '14days' });
  }

  async createPasswordKey(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(
      password + process.env.PW_SECRET_KEY,
      saltOrRounds,
    );
  }

  async isHashVaild(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password + process.env.PW_SECRET_KEY, hash);
  }

  accessTokenVerify(at: string): any {
    try {
      const result = this.jwtService.verify(at);

      const res = {
        seq: result.seq,
        id: result.id,
        iat: result.iat,
        exp: result.exp,
      };

      return res;
    } catch (error) {
      return false;
    }
  }

  async logout(
    accessToken: string,
    refreshToken: string,
  ): Promise<CustomResponseDto> {
    const isAccessToken = this.accessTokenVerify(accessToken);

    // accessToken이 유효하지 않으면 에러 발생
    if (!isAccessToken) {
      return new CustomResponseDto(403, { message: '잘못된 요청입니다.' });
    }

    // 저장된 rt 제거
    RedisCommand.del(`${isAccessToken.seq}:${refreshToken}`);

    // blackList에 at 추가
    RedisCommand.set(
      accessToken,
      'logout',
      isAccessToken.exp - isAccessToken.iat,
    );

    return new CustomResponseDto(200, { message: '로그아웃 되었습니다.' });
  }
}
