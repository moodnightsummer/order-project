import { AuthService } from './auth.service';
import { Controller, Post, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../config/customMetadata';
import { CustomResponseDto } from '../dto/customResponseDto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiTags('로그인')
  @ApiBody({
    schema: {
      properties: {
        userId: { type: 'string', example: 'torder1' },
        password: { type: 'string', example: 'qwe123!@#' },
      },
    },
  })
  @SkipAuth()
  async signIn(@Request() req): Promise<any> {
    // 있는 아이디인지 확인
    const user = await this.authService.existsUser(req.body.userId);

    if (!user) {
      return new CustomResponseDto(403, {
        message:
          '아이디 또는 비밀번호를 잘못 입력했습니다\n 입력하신 정보를 다시 확인해주세요',
      });
    }

    // 패스워드 검증
    const passwordVerify: boolean = await this.authService.isHashVaild(
      req.body.password,
      user.password,
    );

    // 토큰 생성
    if (passwordVerify) {
      const accessToken = this.authService.createAccessToken(
        req.body.userId,
        user.seq,
        user.storeSeq,
      );

      const refreshToken = this.authService.createRefreshToken(
        req.body.id,
        user.seq,
      );

      return new CustomResponseDto(200, {
        accessToken,
        refreshToken,
        userSeq: user.seq,
        storeSeq: user.storeSeq,
      });
    }

    return new CustomResponseDto(403, {
      message:
        '아이디 또는 비밀번호를 잘못 입력했습니다\n 입력하신 정보를 다시 확인해주세요',
    });
  }
}
