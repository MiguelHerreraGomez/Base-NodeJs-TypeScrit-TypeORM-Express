import { Router } from 'express';
import ClienteController from './controllers/ClienteController';
import TransferenciasController from './controllers/TrasferenciasController';
import UsuarioController from './controllers/UsuarioController'

const router = Router();
// Consultar Todos los Clientes
router.get('/clients', ClienteController.indexClient);
// Consultar un cliente especifico
router.get('/clients/:numero_documento', ClienteController.showClientByDocument);
// Crear Cliente
router.post('/clients', ClienteController.createClient);
// Actualizar Usuario
router.put('/user/:id_usuario', UsuarioController.updateUser);
// Consultar las transferencias de un cliente especifico con cada uno de sus usuarios en estado activo
router.get('/transferencias/:numero_documento_cliente', TransferenciasController.indexByClients);
// Consultar las transferencias de un cliente y usuario especifico si el estado del cliente y Usuario son estan activos
router.get('/transferencias/:numero_documento_cliente/:numero_documento_usuario', TransferenciasController.indexByClientsAndUser);
// Crear Transferencia
router.post('/transferencias', TransferenciasController.createTransfer);
// Eliminar Transferencia
router.delete('/transferencias/:id_transferencia', TransferenciasController.destroyTransfer);

export default router;