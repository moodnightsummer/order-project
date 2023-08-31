import { ApiProperty } from '@nestjs/swagger';

class PaymentListDto {
  @ApiProperty({
    example: 1,
    description: '주문 내역 번호',
  })
  seq: number;

  @ApiProperty({
    example: 79000,
    description: '메뉴 금액',
  })
  price: number;

  @ApiProperty({
    example: 158000,
    description: '수량에 따른 금액',
  })
  calcPrice: number;

  @ApiProperty({
    example: '안주 플래터 4인',
    description: '메뉴 이름',
  })
  menuName: string;

  @ApiProperty({
    example: 1,
    description: '주문한 메뉴 수량',
  })
  quantity: number;
}

class AmountDto {
  @ApiProperty({
    example: 300000,
    description: '총 결제 금액',
  })
  amount: number;
}

class PaymentDto {
  @ApiProperty({
    example: 1,
    description: '주문 번호',
  })
  orderSeq: number;

  @ApiProperty({
    example: 1,
    description: '유저 번호',
  })
  userSeq: number;

  @ApiProperty({
    example: 390000,
    description: '총 주문 금액',
  })
  totalPrice: number;
}

export { PaymentListDto, AmountDto, PaymentDto };
