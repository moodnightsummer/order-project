import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User, process.env.DATABASE_NAME)
    private userRepo: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepo
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}
