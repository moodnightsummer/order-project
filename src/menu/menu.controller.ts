import { Controller } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CustomResponseDto } from 'src/dto/customResponseDto';

@Controller()
export class MenuController {
  constructor(private menuService: MenuService) {}

  async getMenu(): Promise<CustomResponseDto> {
    return new CustomResponseDto(200, { message: '수정' });
  }
}
