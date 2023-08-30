import { User } from './../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

const entityArrays: EntityClassOrSchema[] = [User];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entityArrays], process.env.DATABASE_NAME),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
