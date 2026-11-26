export type CategoriaMenu =
  | 'DESAYUNO'
  | 'COMIDA'
  | 'CENA'
  | 'GENERAL'
  | 'INFANTIL'
  | 'VEGETARIANO';

export interface ModificadorPlatillo {
  id: number;
  nombre: string;
  costoExtra: number;
}

export interface Platillo {
  id: number;
  nombre: string;
  descripcion: string;
  precioBase: number;
  categoria: CategoriaMenu;
  tiempoPrepMin: number;
  disponible: boolean;
  modificadores: ModificadorPlatillo[];
}

export interface ItemCarrito {
  uid: string;
  platillo: Platillo;
  modificadoresSeleccionados: ModificadorPlatillo[];
  cantidad: number;
  precioUnitarioFinal: number;
}
