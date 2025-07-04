import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Cliente } from "./Cliente.model";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  // Cuando se trabaja con Foreign Key ManyToOne ManyToMany OneToMany o OneToOne
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column()
  rol: string;

  @Column()
  tipo_documento: string;

  @Column()
  numero_documento: number;

  @Column()
  email: string;

  @Column()
  estado: boolean;
}
