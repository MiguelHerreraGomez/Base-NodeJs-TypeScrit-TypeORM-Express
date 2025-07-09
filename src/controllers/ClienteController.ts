import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Cliente } from "../entity/Cliente.model";
import { CreateClienteDto } from "../dtos/cliente/CreateClienteDto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export default {
  // Listar todos los clientes
  async indexClient(req: Request, res: Response): Promise<Response> {
    const bd = AppDataSource.getRepository(Cliente);
    // equvalente a SELECT * FROM clientes
    //const clientes = await bd.find();

    // equivalente a SELECT * FROM clientes ORDER BY id ASC;
    const clientes = await bd.find({ order: { id: "ASC" } });

    const allClientes = clientes.map((c) => ({
      nombre: c.nombre,
      tipo_documento: c.tipo_documento,
      numero_documento: c.numero_documento,
      email: c.email,
    }));

    return res.json(allClientes);
  },

  // Consultar cliente especifico
  async showClientByDocument(req: Request, res: Response): Promise<Response> {
    const bd = AppDataSource.getRepository(Cliente);
    const numero_documento = Number(req.params.numero_documento);
    // equvalente a SELECT * FROM clientes WHERE numero_documento = 'numero_documento'
    const cliente = await bd.findOneBy({ numero_documento: numero_documento });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no existente" });
    }

    const clienteByNumeroDocumento = {
      nombre: cliente.nombre,
      tipo_documento: cliente.tipo_documento,
      numero_documento: cliente.numero_documento,
      email: cliente.email,
    };

    return res.json(clienteByNumeroDocumento);
  },

  // Crear Cliente
  async createClient(req: Request, res: Response): Promise<Response> {
    const dto = plainToInstance(CreateClienteDto, req.body);
    dto.numero_documento
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      return res.status(404).json({ message: "Datos invalidos", errors });
    }

    const bd = AppDataSource.getRepository(Cliente);
    const existente = await bd.findOneBy({
      numero_documento: dto.numero_documento,
    });

    if (existente) {
      return res.status(400).json({ message: "Cliente ya existente" });
    }

    const nuevo = bd.create({
      ...dto,
      estado: true,
    });

    await bd.save(nuevo);
    return res.status(200).json({ message: "Cliente creado exitosamente" });
  },
};
