import { InjectDataSource } from '@nestjs/typeorm';
import { OrderRepository } from './../database/repository/order.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import {
  OrderDetailRowDto,
  OrderInputDto,
  OrderListDto,
  OrderListRowsDto,
} from './dto/order.dto';
import { OrderDetailRepository } from 'src/database/repository/orderDetail.repository';
import { Order } from 'src/database/entities/Order';
import { OrderDetail } from 'src/database/entities/OrderDetail';

@Injectable()
export class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private orderDetailRepo: OrderDetailRepository,
    @InjectDataSource(process.env.DATABASE_NAME) // 트랜잭션을 위한 injection
    private readonly dataSource: DataSource,
  ) {}

  // 아직 결제되지 않은 주문이 있는지 확인
  async checkExistOrder(userSeq: number): Promise<number> {
    const isStatus = await this.orderRepo.checkOrder(userSeq);

    if (isStatus) {
      return isStatus.seq;
    } else {
      return 0;
    }
  }

  createOrderDetailReq(
    orderList: OrderInputDto[],
    orderSeq: number,
  ): OrderDetailRowDto[] {
    const orderDetailReq = [];

    orderList.forEach((item) => {
      const result = new OrderDetailRowDto();

      result.menuSeq = item.menuSeq;
      result.orderSeq = orderSeq;
      result.quantity = item.quantity;

      orderDetailReq.push(result);
    });

    return orderDetailReq;
  }

  async order(
    userSeq: number,
    orderSeq: number,
    orderList: OrderInputDto[],
  ): Promise<CustomResponseDto> {
    let orderDetailRows;

    // 아직 결제되지 않은 주문 건이 있을 경우 해당 주문 건에 주문 내역 추가
    if (orderSeq) {
      try {
        orderDetailRows = this.createOrderDetailReq(orderList, orderSeq);

        // 주문 내역 save
        await this.orderDetailRepo.createOrderDetails(orderDetailRows);

        return new CustomResponseDto(200, {
          message: '주문을 성공하였습니다.',
        });
      } catch (error) {
        console.log(error);

        return new CustomResponseDto(403, {
          message: '주문을 실패하였습니다.',
        });
      }
    } else {
      // 주문 건이 없을 시 새로운 주문을 생성하고 그 주문에 주문 내역 추가
      const queryRunner = await this.dataSource.createQueryRunner();

      // 트랜잭션 시작
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // 주문 save
        const saveOrder = await queryRunner.manager.save(Order, { userSeq });

        // orderSeq 추가하여 orderDetail 생성
        orderDetailRows = this.createOrderDetailReq(orderList, saveOrder.seq);

        // 주문 내역 save
        await queryRunner.manager.save(OrderDetail, orderDetailRows);

        // 모두 성공 시 commit
        await queryRunner.commitTransaction();
      } catch (error) {
        console.log(error);
        // 실패 시 rollback
        await queryRunner.rollbackTransaction();
      } finally {
        // 트랜잭션 종료
        await queryRunner.release();
      }
    }
  }

  async findOrderList(userSeq: number): Promise<CustomResponseDto> {
    try {
      const orderStatus = await this.checkExistOrder(userSeq);

      if (!orderStatus) {
        return new CustomResponseDto(200, []);
      } else {
        const result = new OrderListDto();

        result.orderSeq = orderStatus;

        const date: OrderListRowsDto[] =
          await this.orderRepo.findOrderListByUserSeq(userSeq);

        result.totalPrice = date.reduce(
          (sum, row) => sum + Number(row.calcPrice),
          0,
        );

        result.orderList = date;

        return new CustomResponseDto(200, result);
      }
    } catch (error) {
      console.log(error);

      return new CustomResponseDto(403, {
        message: '주문 내역 조회에 실패하였습니다.',
      });
    }
  }
}
