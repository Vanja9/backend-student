import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Predmet } from "./Predmet";
import { Student } from "./Student";

@Index("fk_ocena_predmet", ["predmetId"], {})
@Index("fk_ocena_student", ["studentId"], {})
@Entity("ocena", { schema: "vanja" })
export class Ocena {
  @PrimaryGeneratedColumn({ type: "int", name: "ocena_id", unsigned: true })
  ocenaId: number;

  @Column("int", { name: "predmet_id", unsigned: true })
  predmetId: number;

  @Column("int", { name: "student_id", unsigned: true })
  studentId: number;

  @Column("int", { name: "ocena", unsigned: true })
  ocena: number;

  @ManyToOne(() => Predmet, (predmet) => predmet.ocenas, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "predmet_id", referencedColumnName: "predmetId" }])
  predmet: Predmet;

  @ManyToOne(() => Student, (student) => student.ocenas, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "student_id", referencedColumnName: "studentId" }])
  student: Student;
}
