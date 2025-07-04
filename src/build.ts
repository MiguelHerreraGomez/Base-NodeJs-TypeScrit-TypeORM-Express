import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a MySQL");

    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((error: unknown) => {
    console.error("Error al conectar a MySQL:", error);
  });
