import { CustomResponseDto } from 'src/dto/customResponseDto';
import { MenuCategoryRepository } from './../database/repository/menuCategory.repository';
import { Injectable } from '@nestjs/common';
import { MenuDto, MenuRowsDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly menuCategoryRepo: MenuCategoryRepository) {}

  async findMenuByStoreSeq(storeSeq: number): Promise<CustomResponseDto> {
    try {
      const data =
        await this.menuCategoryRepo.findMenuCategoryByStoreSeq(storeSeq);

      const result = [];

      // 조회한 데이터베이스 내 값들을 dto 형식에 맞게 정제
      data.forEach((item) => {
        const data = new MenuRowsDto();
        data.seq = item.seq;
        data.name = item.menu_name;
        data.price = item.price;
        data.comment = item.comment;
        data.soldoutStatus = item.soldout_status;

        // result에 삽입되지 않은 메뉴 카테고리면 먼저 등록
        if (
          !result.find((element) => element.categorySeq === item.category_seq)
        ) {
          const menu = new MenuDto();

          menu.categorySeq = item.category_seq;
          menu.categoryName = item.category_name;

          menu.data = [data];

          result.push(menu);
        } else {
          // 이미 등록된 메뉴 카테고리면 index 찾아서 row만 삽입
          const index = result.findIndex(
            (element) => element.categorySeq === item.category_seq,
          );

          result[index].data.push(data);
        }
      });

      return new CustomResponseDto(200, result);
    } catch (error) {
      return new CustomResponseDto(403, {
        message: '메뉴를 받아올 수 없습니다.',
      });
    }
  }
}
