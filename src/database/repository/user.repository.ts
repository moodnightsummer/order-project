import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
console.log(process.env.DATABASE_NAME);

export class UserRepository {
  constructor(
    @InjectRepository(User, process.env.DATABASE_NAME)
    private userRepo: Repository<User>,
  ) {}

  async findById(id: string) {
    console.log(process.env.DATABASE_NAME);

    return await this.userRepo
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}
