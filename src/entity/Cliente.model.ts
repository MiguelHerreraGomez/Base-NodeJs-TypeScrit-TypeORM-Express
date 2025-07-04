import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("clientes")
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo_documento: string;

  @Column()
  numero_documento: number;

  @Column()
  email: string;

  @Column()
  estado: boolean;
}
