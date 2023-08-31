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

const entityArrays: EntityClassOrSchema[] = [
  User,
  Menu,
  MenuCategory,
  Order,
  OrderDetail,
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
  ],
  exports: [
    UserRepository,
    OrderRepository,
    MenuCategoryRepository,
    OrderDetailRepository,
  ],
})
export class RepositoryModule {}
