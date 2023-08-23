import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ocena } from "./Ocena";
import { StudentPredmet } from "./StudentPredmet";

@Entity("student", { schema: "vanja" })
export class Student {
  @PrimaryGeneratedColumn({ type: "int", name: "student_id", unsigned: true })
  studentId: number;

  @Column("varchar", { name: "ime", length: 45 })
  ime: string;

  @Column("varchar", { name: "prezime", length: 45 })
  prezime: string;

  @Column("varchar", { name: "br_indeksa", length: 45 })
  brIndeksa: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Ocena, (ocena) => ocena.student)
  ocenas: Ocena[];

  @OneToMany(() => StudentPredmet, (studentPredmet) => studentPredmet.student)
  studentPredmets: StudentPredmet[];
}
