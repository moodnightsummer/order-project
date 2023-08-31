import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { OrderDetail } from "./OrderDetail";
import { Payment } from "./Payment";

@Index("order_FK", ["userSeq"], {})
@Entity("order", { schema: "torder" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "주문 번호" })
  seq: number;

  @Column("int", { name: "user_seq", comment: "유저 번호" })
  userSeq: number;

  @Column("char", {
    name: "payment_status",
    comment: "결제 상태",
    length: 1,
    default: () => "'N'",
  })
  paymentStatus: string;

  @Column("datetime", {
    name: "update_date",
    nullable: true,
    comment: "수정 날짜",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date | null;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_seq", referencedColumnName: "seq" }])
  userSeq2: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderSeq2)
  orderDetails: OrderDetail[];

  @OneToMany(() => Payment, (payment) => payment.orderSeq2)
  payments: Payment[];
}
