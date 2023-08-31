import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderDto, OrderListDto } from './dto/order.dto';

@Controller()
@ApiTags('주문')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '주문하기',
  })
  async addOrder(
    @Req() req,
    @Body() orderDto: OrderDto,
  ): Promise<CustomResponseDto> {
    // 기존 주문 내역이 있는지 확인
    const orderStatus = await this.orderService.checkExistOrder(req.user.seq);

    return await this.orderService.order(
      req.user.seq,
      orderStatus,
      orderDto.orderList,
    );
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @ApiResponse({ type: OrderListDto })
  @ApiOperation({
    summary: '주문 내역',
  })
  async getOrderList(@Req() req): Promise<CustomResponseDto> {
    return await this.orderService.findOrderList(req.user.seq);
  }
}
