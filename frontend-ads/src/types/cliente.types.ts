export type EstadoPedidoDomicilio =
  | 'PENDIENTE_ACEPTACION'
  | 'EN_PREPARACION'
  | 'EN_CAMINO'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface PedidoCliente {
  id: number;
  folio: string;
  fechaHora: string;
  direccionEntrega: string;
  itemsResumen: string[];
  subtotal: number;
  descuento: number;
  propina: number;
  total: number;
  estado: EstadoPedidoDomicilio;
  minutosTranscurridos: number;
}

export interface ReservacionCliente {
  id: number;
  codigo: string;
  fecha: string;
  hora: string;
  comensales: number;
  zonaPreferida: 'Salón Central' | 'Terraza' | 'Ventana' | 'Salón Privado';
  consumoEstimado: number;
  anticipoPagado: number;
  estado: 'CONFIRMADA' | 'PENDIENTE_PAGO' | 'CANCELADA';
  notas?: string;
}
