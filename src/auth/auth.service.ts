import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/repository/user.repository';

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
}
