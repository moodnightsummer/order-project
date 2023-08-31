import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { Order } from "./Order";

@Index("order_detail_FK", ["menuSeq"], {})
@Index("order_detail_FK_1", ["orderSeq"], {})
@Entity("order_detail", { schema: "torder" })
export class OrderDetail {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "seq",
    comment: "주문 내역 번호",
  })
  seq: number;

  @Column("int", { name: "order_seq", comment: "주문 번호" })
  orderSeq: number;

  @Column("int", { name: "menu_seq", comment: "메뉴 번호" })
  menuSeq: number;

  @Column("int", { name: "quantity", comment: "수량", default: () => "'1'" })
  quantity: number;

  @Column("datetime", {
    name: "create_date",
    comment: "주문 날짜",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => Menu, (menu) => menu.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "menu_seq", referencedColumnName: "seq" }])
  menuSeq2: Menu;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_seq", referencedColumnName: "seq" }])
  orderSeq2: Order;
}
