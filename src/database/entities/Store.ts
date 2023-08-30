import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("store", { schema: "torder" })
export class Store {
  @PrimaryGeneratedColumn({ type: "int", name: "seq", comment: "매장 번호" })
  seq: number;

  @Column("varchar", { name: "store_name", comment: "매장 이름", length: 100 })
  storeName: string;

  @OneToMany(() => User, (user) => user.storeSeq2)
  users: User[];
}
