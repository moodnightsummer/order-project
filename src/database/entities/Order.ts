import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Payment } from "./Payment";

@Index("order_FK", ["userSeq"], {})
@Entity("order", { schema: "torder" })
export class Order {
  @Column("int", { primary: true, name: "seq", comment: "주문 번호" })
  seq: number;

  @Column("int", { name: "userSeq", comment: "유저 번호" })
  userSeq: number;

  @Column("char", {
    name: "payment_status",
    comment: "결제 상태",
    length: 1,
    default: () => "'N'",
  })
  paymentStatus: string;

  @Column("date", { name: "update_date", nullable: true, comment: "수정 날짜" })
  updateDate: string | null;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userSeq", referencedColumnName: "seq" }])
  userSeq2: User;

  @OneToMany(() => Payment, (payment) => payment.orderSeq2)
  payments: Payment[];
}
