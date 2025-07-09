import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './database/data-source';
import routes from './routes';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado a MySQL');

    app.use('/', routes);

    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });

    /* Catch Validation error */
    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      if (err?.error?.isJoi) {
        res.status(420).json({
          type: err.type,
          error: err.error.toString(),
        });
      } else {
        next(err);
      }
    });
  })
  .catch((error: unknown) => {
    console.error('Error al conectar a MySQL:', error);
  });
