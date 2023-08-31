import { OrderDetail } from './../entities/OrderDetail';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/Order';
import { Repository } from 'typeorm';
import { OrderDetailRowDto } from 'src/order/dto/order.dto';

export class OrderDetailRepository {
  constructor(
    @InjectRepository(Order, process.env.DATABASE_NAME)
    private orderDetailRepo: Repository<OrderDetail>,
  ) {}

  async createOrderDetails(orderDetailRow: OrderDetailRowDto[]) {
    return await this.orderDetailRepo
      .createQueryBuilder()
      .insert()
      .into(OrderDetail)
      .values(orderDetailRow)
      .execute();
  }
}
