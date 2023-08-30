import { Column, Entity } from "typeorm";

@Entity("order_detail", { schema: "torder" })
export class OrderDetail {
  @Column("int", { primary: true, name: "seq", comment: "주문 내역 번호" })
  seq: number;

  @Column("int", { name: "order_seq", comment: "주문 번호" })
  orderSeq: number;

  @Column("int", { name: "menu_seq", comment: "메뉴 번호" })
  menuSeq: number;

  @Column("int", { name: "quantity", comment: "수량", default: () => "'1'" })
  quantity: number;

  @Column("date", { name: "create_date", comment: "주문 날짜" })
  createDate: string;
}
