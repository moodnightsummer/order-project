import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'rt',
    description: 'refreshToken',
  })
  refreshToken: string;
}
