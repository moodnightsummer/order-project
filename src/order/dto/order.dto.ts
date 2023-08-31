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

class OrderDto {
  @ApiProperty({
    type: [OrderInputDto],
    description: '주문 내역 배열',
  })
  readonly orderList: OrderInputDto[];
}

export { OrderDto, OrderInputDto, OrderDetailRowDto };
