import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/database/repository/order.repository';
import { PaymentRepository } from 'src/database/repository/payment.repository';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import { PaymentDto, PaymentListDto } from './dto/payment.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Payment } from 'src/database/entities/Payment';
import { Order } from 'src/database/entities/Order';

@Injectable()
export class PaymentService {
  constructor(
    private paymentRepo: PaymentRepository,
    private orderRepo: OrderRepository,
    @InjectDataSource(process.env.DATABASE_NAME) // 트랜잭션을 위한 injection
    private readonly dataSource: DataSource,
  ) {}

  async payment(userSeq: number, amount: number): Promise<CustomResponseDto> {
    try {
      const checkOrder = await this.orderRepo.checkOrder(userSeq);

      if (!checkOrder) {
        throw new Error('There is no order history');
      }

      const orderList: PaymentListDto[] =
        await this.orderRepo.findOrderListByUserSeq(userSeq);

      // 전체 금액 계산
      const totalPrice = orderList.reduce(
        (sum, row) => sum + Number(row.calcPrice),
        0,
      );

      let message;

      if (totalPrice === amount) {
        message = '결제가 성공적으로 완료되었습니다';
      } else if (totalPrice > amount) {
        throw new Error('dont have enough money');
      } else if (totalPrice < amount) {
        message = `결제가 성공적으로 완료되었습니다.\n남은 금액은 ${
          amount - totalPrice
        }원입니다`;
      }

      // 주문 건이 없을 시 새로운 주문을 생성하고 그 주문에 주문 내역 추가
      const queryRunner = await this.dataSource.createQueryRunner();

      // 트랜잭션 시작
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const paymentReq = [];
      const paymentDto = new PaymentDto();

      paymentDto.orderSeq = checkOrder.seq;
      paymentDto.totalPrice = totalPrice;
      paymentDto.userSeq = userSeq;

      paymentReq.push(paymentDto);

      try {
        // 결제 save
        await queryRunner.manager.save(Payment, paymentReq);

        // 주문 내역 update
        await queryRunner.manager.update(
          Order,
          { seq: checkOrder.seq },
          { paymentStatus: 'Y' },
        );

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

      return new CustomResponseDto(200, { message });
    } catch (error) {
      console.log(error);

      return new CustomResponseDto(403, {
        message: '결제에 실패하였습니다. 다시 시도해 주세요.',
      });
    }
  }
}
