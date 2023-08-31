import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Order } from "./Order";

@Index("payment_FK", ["userSeq"], {})
@Index("payment_FK_1", ["orderSeq"], {})
@Entity("payment", { schema: "torder" })
export class Payment {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "결제 번호" })
  seq: number;

  @Column("int", { name: "user_seq", comment: "유저 번호" })
  userSeq: number;

  @Column("int", { name: "order_seq", comment: "주문 번호" })
  orderSeq: number;

  @Column("varchar", {
    name: "total_price",
    comment: "총 결제 금액",
    length: 100,
  })
  totalPrice: string;

  @Column("datetime", {
    name: "create_date",
    comment: "결제 날짜",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_seq", referencedColumnName: "seq" }])
  userSeq2: User;

  @ManyToOne(() => Order, (order) => order.payments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_seq", referencedColumnName: "seq" }])
  orderSeq2: Order;
}
