import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./Menu";

@Entity("menu_category", { schema: "torder" })
export class MenuCategory {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "seq",
    comment: "카테고리 번호",
  })
  seq: number;

  @Column("varchar", {
    name: "category_name",
    comment: "카테고리명",
    length: 100,
  })
  categoryName: string;

  @Column("int", { name: "store_seq", comment: "매장 번호" })
  storeSeq: number;

  @OneToMany(() => Menu, (menu) => menu.categorySeq2)
  menus: Menu[];
}
