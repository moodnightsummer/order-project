import { ApiProperty } from '@nestjs/swagger';

class MenuRowsDto {
  @ApiProperty({
    example: 1,
    name: 'seq',
    description: '메뉴 번호',
  })
  seq: number;

  @ApiProperty({
    example: '안주 플래터 2인',
    name: 'name',
    description: '메뉴 이름',
  })
  name: string;

  @ApiProperty({
    example:
      '바삭한 돌문어 튀김, 부드러운 삶은 삼겹살, 매콤한 무말랭이 무침 샐러드를 한 그릇에 담았습니다.',
    name: 'comment',
    description: '메뉴 설명',
  })
  comment: string;

  @ApiProperty({
    example: '11,000',
    name: 'price',
    description: '메뉴 가격',
  })
  price: string;

  @ApiProperty({
    example: 'N',
    name: 'soldoutStatus',
    description: '품절 여부',
  })
  soldoutStatus: string;
}

class MenuDto {
  @ApiProperty({
    example: 1,
    name: 'categorySeq',
    description: '메뉴 카테고리 번호',
  })
  categorySeq: number;

  @ApiProperty({
    example: '안주',
    name: 'categoryName',
    description: '메뉴 카테고리 이름',
  })
  categoryName: string;

  @ApiProperty({
    type: [MenuRowsDto],
    name: 'data',
    description: '카테고리 내 메뉴 목록',
  })
  data: MenuRowsDto[];
}

export { MenuRowsDto, MenuDto };
