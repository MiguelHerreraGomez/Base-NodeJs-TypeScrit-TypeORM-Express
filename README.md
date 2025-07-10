# API NODE.JS + TypeScript

Esta Api es de prueba y sirve de base para proyectos con Node.Js y TypeScript

# Crear Proyecto Nuevo

- npm init -y
- npm install typescript --save-dev
- npm install @types/node --save-dev
- npx tsc --init
- npm install ts-node-dev --save-dev
- npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
- npm install --save-dev eslint-config-prettier
- npm install --save-dev jest ts-jest @types/jest
- npx ts-jest config:init
- npm install express@4
- npm install @types/express@4
- npm install swagger-jsdoc swagger-ui-express
- npm install class-validator class-transformer
- npm install joi
- npm i express-joi-validation joi --save

Instalacion de Type ORM

General para todos los tipos de bases de datos

- npm install --save-dev @types/node

Para Microsoft SQL Server

- npm install typeorm reflect-metadata mssql

Para PostgreSQL

- npm install typeorm reflect-metadata pg

Para MySQL

- npm install typeorm reflect-metadata mysql2

Obligatoriamente tener en tsconfig.json

"experimentalDecorators": true,
"emitDecoratorMetadata": true

ManyToOne → Siempre lleva @JoinColumn

@ManyToOne(() => Usuario)
@JoinColumn({ name: 'id_usuario' })
usuario: Usuario;

OneToMany → No lleva @JoinColumn

@OneToMany(() => Cliente, cliente => cliente.usuario)
clientes: Cliente[];

ManyToMany → @JoinTable, no @JoinColumn

@ManyToMany(() => Producto)
@JoinTable() // si no lo usas, TypeORM no crea la tabla intermedia
productos: Producto[];

ManyToOne con where
OneToMany con QueryBuilder
OneToOne con Where
ManyToMany con QueryBuilder

Ejemplo de QueryBuilder

const clientes = await clienteRepository
.createQueryBuilder('cliente')
.leftJoinAndSelect('cliente.usuarios', 'usuario')
.where('usuario.estado = :estado', { estado: true })
.getMany();

Configuraciones adicionales para el modelo

Números decimales
@Column('decimal', { precision: 10, scale: 2 })
valor: number;

Texto limitado
@Column('varchar', { length: 100 })
email: string;

Boolean
@Column('boolean', { default: true })
estado: boolean;

Fechas
@Column('date')
fechaNacimiento: Date;
