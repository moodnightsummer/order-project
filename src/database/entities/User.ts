import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Payment } from "./Payment";
import { Store } from "./Store";

@Index("user_UN", ["id"], { unique: true })
@Index("user_FK", ["storeSeq"], {})
@Entity("user", { schema: "torder" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "유저 번호" })
  seq: number;

  @Column("int", { name: "store_seq", comment: "매장 번호" })
  storeSeq: number;

  @Column("varchar", {
    name: "id",
    unique: true,
    comment: "아이디",
    length: 30,
  })
  id: string;

  @Column("varchar", { name: "name", comment: "유저 이름", length: 20 })
  name: string;

  @Column("varchar", { name: "password", comment: "비밀번호", length: 255 })
  password: string;

  @OneToMany(() => Order, (order) => order.userSeq2)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.userSeq2)
  payments: Payment[];

  @ManyToOne(() => Store, (store) => store.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "store_seq", referencedColumnName: "seq" }])
  storeSeq2: Store;
}
