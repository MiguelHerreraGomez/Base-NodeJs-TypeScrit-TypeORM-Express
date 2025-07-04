import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entity/Usuarios.model";
import { UpdateUsuarioDto } from "../dtos/usuario/UpdateUsuarioDto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export default {
  async updateUser(req: Request, res: Response): Promise<Response> {
    const dto = plainToInstance(UpdateUsuarioDto, req.body);
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      return res.status(404).json({ message: "Datos invalidos", errors });
    }

    const id = Number(req.params.id_usuario);
    const bd = AppDataSource.getRepository(Usuario);
    const usuario = await bd.findOneBy({ id });

    if (!usuario) {
      return res
        .status(404)
        .json({ message: "El Usuario ingresado no existe" });
    }

    bd.merge(usuario, dto);
    await bd.save(usuario);
    return res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente" });
  },
};
