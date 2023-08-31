import { ApiProperty, PartialType } from '@nestjs/swagger';

class OrderInputDto {
  @ApiProperty({
    example: 1,
    description: '메뉴 번호',
  })
  menuSeq: number;

  @ApiProperty({
    example: 2,
    description: '수량',
  })
  quantity: number;
}

class OrderDetailRowDto extends PartialType(OrderInputDto) {
  @ApiProperty({
    example: 1,
    description: 'orderSeq',
  })
  orderSeq: number;
}

class OrderListRowsDto {
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

class OrderDto {
  @ApiProperty({
    type: [OrderInputDto],
    description: '주문 내역 배열',
  })
  readonly orderList: OrderInputDto[];
}

class OrderListDto {
  @ApiProperty({
    example: 1,
    description: '주문 번호',
  })
  orderSeq: number;

  @ApiProperty({
    example: 400000,
    description: '총 주문 금액',
  })
  totalPrice: number;

  @ApiProperty({
    type: [OrderListRowsDto],
    description: '주문 내역',
  })
  orderList: OrderListRowsDto[];
}

export {
  OrderDto,
  OrderInputDto,
  OrderDetailRowDto,
  OrderListRowsDto,
  OrderListDto,
};
