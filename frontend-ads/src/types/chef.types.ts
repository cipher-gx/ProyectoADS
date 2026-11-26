export type EstadoOrdenKds =
  | 'PENDIENTE_ACEPTACION'
  | 'EN_PREPARACION'
  | 'STANDBY'
  | 'LISTA'
  | 'EXPIRADA';

export type TipoOrden = 'SALON' | 'DOMICILIO';

export interface ItemOrdenKds {
  id: number;
  nombre: string;
  cantidad: number;
  modificadores?: string[];
}

export interface OrdenKds {
  id: number;
  folio: string;
  tipo: TipoOrden;
  referencia: string;
  estado: EstadoOrdenKds;
  segundosRestantesAceptacion: number;
  horaIngreso: string;
  items: ItemOrdenKds[];
}

export interface IngredienteInventario {
  id: number;
  nombre: string;
  unidad: string;
  stockActual: number;
  stockMinimo: number;
}

export interface PropuestaMenu {
  id: number;
  platilloAfectado: string;
  tipoCambio: 'DESACTIVAR_TEMPORAL' | 'AJUSTE_INGREDIENTE' | 'NUEVO_PLATILLO';
  justificacion: string;
  estado: 'ENVIADA';
}
