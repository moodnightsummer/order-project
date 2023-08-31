import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import { AmountDto } from './dto/payment.dto';

@Controller()
@ApiTags('결제')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  async payment(
    @Req() req,
    @Body() paymentDto: AmountDto,
  ): Promise<CustomResponseDto> {
    return await this.paymentService.payment(req.user.seq, paymentDto.amount);
  }
}
