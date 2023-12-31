import { OrderModule } from './../order/order.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { MenuModule } from 'src/menu/menu.module';
import { PaymentModule } from 'src/payment/payment.module';

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
          {
            path: 'menu',
            module: MenuModule,
          },
          {
            path: 'order',
            module: OrderModule,
          },
          {
            path: 'payment',
            module: PaymentModule,
          },
        ],
      },
    ]),
    AuthModule,
    MenuModule,
    OrderModule,
    PaymentModule,
  ],
})
export class Router {}
