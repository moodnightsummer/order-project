import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'v1',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
        ],
      },
    ]),
    AuthModule,
  ],
})
export class Router {}
