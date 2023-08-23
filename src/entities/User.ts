import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user", { schema: "vanja" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;
}
