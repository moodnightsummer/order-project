import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/Order';
import { Repository } from 'typeorm';

export class OrderRepository {
  constructor(
    @InjectRepository(Order, process.env.DATABASE_NAME)
    private orderRepo: Repository<Order>,
  ) {}

  async checkOrder(userSeq: number) {
    return await this.orderRepo
      .createQueryBuilder()
      .where('user_seq = :userSeq', { userSeq })
      .andWhere("payment_status = 'N'")
      .getOne();
  }
}
