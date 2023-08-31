import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/Order';
import { Repository } from 'typeorm';
import { OrderDetail } from '../entities/OrderDetail';
import { Menu } from '../entities/Menu';

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

  async findOrderListByUserSeq(userSeq: number) {
    return await this.orderRepo
      .createQueryBuilder('o')
      .select([
        'od.seq AS seq',
        'm.price * od.quantity AS calcPrice',
        'm.menuName AS menuName',
        'm.price AS price',
        'od.quantity AS quantity',
      ])
      .leftJoin(OrderDetail, 'od', 'o.seq = od.order_seq')
      .leftJoin(Menu, 'm', 'od.menu_seq = m.seq')
      .where('o.user_seq = :userSeq', { userSeq })
      .andWhere("o.payment_status = 'N'")
      .getRawMany();
  }
}
