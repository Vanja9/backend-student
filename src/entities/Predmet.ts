import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ocena } from "./Ocena";
import { StudentPredmet } from "./StudentPredmet";

@Entity("predmet", { schema: "vanja" })
export class Predmet {
  @PrimaryGeneratedColumn({ type: "int", name: "predmet_id", unsigned: true })
  predmetId: number;

  @Column("varchar", { name: "ime", length: 45 })
  ime: string;

  @Column("int", { name: "espb", default: () => "'0'" })
  espb: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Ocena, (ocena) => ocena.predmet)
  ocenas: Ocena[];

  @OneToMany(() => StudentPredmet, (studentPredmet) => studentPredmet.predmet)
  studentPredmets: StudentPredmet[];
}
