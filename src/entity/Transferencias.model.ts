import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./Usuarios.model";

@Entity("transferencias")
export class Transferencias {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column()
  tipo_transferencia: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;
}
