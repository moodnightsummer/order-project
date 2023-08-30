import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuCategory } from "./MenuCategory";

@Index("menu_FK", ["categorySeq"], {})
@Entity("menu", { schema: "torder" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "메뉴 번호" })
  seq: number;

  @Column("varchar", { name: "menu_name", comment: "메뉴 이름", length: 100 })
  menuName: string;

  @Column("int", { name: "category_seq", comment: "카테고리 번호" })
  categorySeq: number;

  @Column("int", { name: "price", nullable: true, comment: "메뉴 가격" })
  price: number | null;

  @Column("varchar", {
    name: "commant",
    nullable: true,
    comment: "메뉴 설명",
    length: 255,
  })
  commant: string | null;

  @Column("char", {
    name: "soldout_status",
    comment: "품절 여부",
    length: 1,
    default: () => "'N'",
  })
  soldoutStatus: string;

  @ManyToOne(() => MenuCategory, (menuCategory) => menuCategory.menus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "category_seq", referencedColumnName: "seq" }])
  categorySeq2: MenuCategory;
}
