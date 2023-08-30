import { InjectRepository } from '@nestjs/typeorm';
import { MenuCategory } from '../entities/MenuCategory';
import { Repository } from 'typeorm';
import { Menu } from '../entities/Menu';

export class MenuCategoryRepository {
  constructor(
    @InjectRepository(MenuCategory, process.env.DATABASE_NAME)
    private menuCategoryRepo: Repository<MenuCategory>,
  ) {}

  async findMenuCategoryByStoreSeq(storeSeq: number) {
    return await this.menuCategoryRepo
      .createQueryBuilder('mc')
      .select([])
      .innerJoin(Menu, 'm', 'm.category_seq = mc.seq')
      .where('mc.store_seq = :storeSeq', { storeSeq })
      .groupBy()
      .getRawMany();
  }
}
