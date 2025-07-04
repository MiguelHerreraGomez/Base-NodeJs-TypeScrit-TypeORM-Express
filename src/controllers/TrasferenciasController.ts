import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Cliente } from "../entity/Cliente.model";
import { Usuario } from '../entity/Usuarios.model';
import { Transferencias } from "../entity/Transferencias.model";
import { CreateTransferenciaDto } from "../dtos/transferencias/CreateTransferenciaDto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export default {
  // Listar Transferencias en base a Clientes
  async indexByClients(req: Request, res: Response): Promise<Response> {
    // Extraer Cliente
    const table_cliente = AppDataSource.getRepository(Cliente);
    const numero_documento_cliente = Number(
      req.params.numero_documento_cliente
    );

    const cliente = await table_cliente.findOneBy({
      numero_documento: numero_documento_cliente,
      estado: true,
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no existente" });
    }

    // Extraer Usuarios
    const table_usuario = AppDataSource.getRepository(Usuario);
    const usuario = await table_usuario.find({
      where: {
        cliente: { id: cliente.id },
        estado: true,
      },
    });

    const table_transferencias = AppDataSource.getRepository(Transferencias);
    // promise.all se utiliza cuando hay varios registros y para cada registro hay varios registros
    const ususariosConTransferencias = await Promise.all(
      usuario.map(async (usuario) => {
        // Extraer Transferencias
        const transferencias = await table_transferencias.find({
          where: {
            usuario: { id: usuario.id },
          },
          order: { fecha: "DESC" },
        });

        return {
          nombre: usuario.nombre,
          numero_documento: usuario.numero_documento,
          email: usuario.email,
          transferencias: transferencias.map((t) => ({
            tipo_transferencia: t.tipo_transferencia,
            fecha: t.fecha,
            valor: t.valor,
          })),
        };
      })
    );

    return res.json({
      cliente: {
        nombre: cliente.nombre,
        tipo_documento: cliente.tipo_documento,
        numero_documento: cliente.numero_documento,
        email: cliente.email,
      },
      usuario: ususariosConTransferencias,
    });
  },

  // Listar Transferencias en base a Clientes y Usuarios
  async indexByClientsAndUser(req: Request, res: Response): Promise<Response> {
    // Extraer Cliente
    const table_cliente = AppDataSource.getRepository(Cliente);
    const numero_documento_cliente = Number(
      req.params.numero_documento_cliente
    );

    const cliente = await table_cliente.findOneBy({
      numero_documento: numero_documento_cliente,
      estado: true,
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no existente" });
    }

    // Extraer Usuarios
    const table_usuario = AppDataSource.getRepository(Usuario);
    const numero_documento_usuario = Number(
      req.params.numero_documento_usuario
    );
    const usuario = await table_usuario.findOne({
      where: {
        numero_documento: numero_documento_usuario,
        estado: true,
      },
      relations: ["cliente"],
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no existente" });
    }

    if (usuario.cliente.id !== cliente.id) {
      return res.status(400).json({
        message: "El usuario no pertenece al cliente especificado",
      });
    }

    const table_transferencias = AppDataSource.getRepository(Transferencias);
    // Extraer Transferencias
    const transferencias = await table_transferencias.find({
      where: {
        usuario: { id: usuario.id },
      },
      order: { fecha: "DESC" },
    });

    return res.json({
      cliente: {
        nombre: cliente.nombre,
        tipo_documento: cliente.tipo_documento,
        numero_documento: cliente.numero_documento,
        email: cliente.email,
        usuario: {
          nombre: usuario.nombre,
          numero_documento: usuario.numero_documento,
          email: usuario.email,
          transferencias: transferencias.map((t) => ({
            tipo_transferencia: t.tipo_transferencia,
            fecha: t.fecha,
            valor: t.valor,
          })),
        },
      },
    });
  },

  //Crear Transaccion
  async createTransfer(req: Request, res: Response): Promise<Response> {
    const dto = plainToInstance(CreateTransferenciaDto, req.body);
    const errors = await validate(dto, {whitelist: true, forbidNonWhitelisted: true,});

    if (errors.length > 0) {
      return res.status(404).json({ message: "Datos invalidos", errors });
    };

    // Extraer id_usuario
    const tabla_usuario = AppDataSource.getRepository(Usuario);

    // Sin QueryBuilder
    //const usuario = await tabla_usuario.findOneBy({numero_documento: dto.numero_documento_usuario})
    // Con QueryBuilder
    const usuario = await tabla_usuario.createQueryBuilder("usuario").select("usuario")
        .where("usuario.numero_documento = :numero", {numero: dto.numero_documento_usuario,})
        .getOne();
    
    if(!usuario){
        return res.status(404).json({ message: "El usuario ingresado no existe"});
    }
    
    const tabla_transferencia = AppDataSource.getRepository(Transferencias);
    // generar fecha y hora de Bogota en formato 24 horas
    const fechaColombia = new Date();
    
    const nuevo = tabla_transferencia.create({
        usuario,
        tipo_transferencia: dto.tipo_transferencia,
        fecha: fechaColombia,
        valor: dto.valor,
    });

    await tabla_transferencia.save(nuevo);
    return res.status(200).json({ message: "Transferencia creada exitosamente"});
  },

  async destroyTransfer(req: Request, res:Response): Promise<Response> {

    const id_transferencia = Number(req.params.id_transferencia);
    const bd = AppDataSource.getRepository(Transferencias);
    const transferencia_eliminar = await bd.findOneBy({id: id_transferencia});

    if(!transferencia_eliminar) {
        return res.status(404).json({ message: "La Transferencia no existe"});
    };

    await bd.remove(transferencia_eliminar!)

    return res.status(200).json({ message: "La Transferencia a sido eliminada correctamente"});
  }
};
