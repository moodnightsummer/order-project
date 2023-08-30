import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CustomResponseDto } from 'src/dto/customResponseDto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuDto } from './dto/menu.dto';
import { AccessTokenGuard } from 'src/auth/accessToken.guard';

@ApiTags('메뉴')
@Controller()
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '메뉴 조회',
    description: '해당 매장의 메뉴를 조회합니다.',
  })
  @ApiResponse({ type: MenuDto })
  async getMenu(@Req() req): Promise<CustomResponseDto> {
    return await this.menuService.findMenuByStoreSeq(req.user.storeSeq);
  }
}
