import { User } from './../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { MenuCategory } from '../entities/MenuCategory';
import { Menu } from '../entities/Menu';
import { MenuCategoryRepository } from './menuCategory.repository';

const entityArrays: EntityClassOrSchema[] = [User, Menu, MenuCategory];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entityArrays], process.env.DATABASE_NAME),
  ],
  providers: [UserRepository, MenuCategoryRepository],
  exports: [UserRepository, MenuCategoryRepository],
})
export class RepositoryModule {}
