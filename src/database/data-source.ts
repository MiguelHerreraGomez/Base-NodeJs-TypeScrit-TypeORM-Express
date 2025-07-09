import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dev01',
  database: 'Migue',
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, '../entity/**/*.{js,ts}')],
});
