import { AuthService } from './auth.service';
import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/login')
  async login() {}
}
