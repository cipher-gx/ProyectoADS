import { api } from './api';

export const authService = {
  login: (correo: string, password: string) => api.post('/auth/login', { correo, password }),
  registrarCliente: (payload: Record<string, unknown>) => api.post('/auth/registro', payload),
};

export const menuService = {
  obtenerMenu: (turno?: string) => api.get('/menu', { params: { turno } }),
  validarCupon: (codigo: string) => api.get(`/cupones/${codigo}`),
};

export const pedidosService = {
  listarMisPedidos: () => api.get('/pedidos/mios'),
  crearPedidoDomicilio: (payload: Record<string, unknown>) => api.post('/pedidos', payload),
  cancelarPedido: (id: number) => api.patch(`/pedidos/${id}/cancelar`),
};

export const reservacionesService = {
  listarMias: () => api.get('/reservaciones/mias'),
  crear: (payload: Record<string, unknown>) => api.post('/reservaciones', payload),
};

export const mesasService = {
  listarMesas: () => api.get('/mesas'),
  listarComandas: () => api.get('/comandas'),
  crearComanda: (payload: Record<string, unknown>) => api.post('/comandas', payload),
  modificarComanda: (id: number, payload: Record<string, unknown>) => api.put(`/comandas/${id}`, payload),
  cerrarCuenta: (id: number) => api.patch(`/comandas/${id}/cerrar`),
};

export const kdsService = {
  obtenerCola: () => api.get('/kds/ordenes'),
  aceptarOrden: (id: number) => api.patch(`/kds/ordenes/${id}/aceptar`),
  rechazarOrden: (id: number) => api.patch(`/kds/ordenes/${id}/rechazar`),
  marcarLista: (id: number) => api.patch(`/kds/ordenes/${id}/lista`),
  obtenerInventario: () => api.get('/inventario'),
  enviarPropuestaMenu: (payload: Record<string, unknown>) => api.post('/menu/propuestas', payload),
};
