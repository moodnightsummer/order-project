import { User } from './../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { MenuCategory } from '../entities/MenuCategory';
import { Menu } from '../entities/Menu';
import { MenuCategoryRepository } from './menuCategory.repository';
import { Order } from '../entities/Order';
import { OrderDetail } from '../entities/OrderDetail';
import { OrderRepository } from './order.repository';
import { OrderDetailRepository } from './orderDetail.repository';
import { Payment } from '../entities/Payment';
import { PaymentRepository } from './payment.repository';

const entityArrays: EntityClassOrSchema[] = [
  User,
  Menu,
  MenuCategory,
  Order,
  OrderDetail,
  Payment,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entityArrays], process.env.DATABASE_NAME),
  ],
  providers: [
    UserRepository,
    OrderRepository,
    MenuCategoryRepository,
    OrderDetailRepository,
    PaymentRepository,
  ],
  exports: [
    UserRepository,
    OrderRepository,
    MenuCategoryRepository,
    OrderDetailRepository,
    PaymentRepository,
  ],
})
export class RepositoryModule {}
