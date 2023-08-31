import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';

@Controller()
@ApiTags('주문')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  async addOrder(
    @Req() req,
    @Body() body: OrderDto,
  ): Promise<CustomResponseDto> {
    try {
      // 기존 주문 내역이 있는지 확인
      const orderStatus = await this.orderService.checkExistOrder(req.user.seq);

      return await this.orderService.order(
        req.user.seq,
        orderStatus,
        body.orderList,
      );

      // 주문 내역이 있을 시 현재 주문에 주문 내역 추가

      return new CustomResponseDto(200, { message: '성공' });
    } catch (error) {
      return new CustomResponseDto(403, { message: '에러' });
    }
  }
}
