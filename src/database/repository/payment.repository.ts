import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/Payment';
import { Repository } from 'typeorm';

export class PaymentRepository {
  constructor(
    @InjectRepository(Payment, process.env.DATABASE_NAME)
    private paymentRepo: Repository<Payment>,
  ) {}

  async findOrderListByUserSeq(userSeq: number) {}
}
