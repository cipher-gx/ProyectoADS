export type RolUsuario = 'CLIENTE' | 'MESERO' | 'CHEF';

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  correo: string;
  password: string;
  telefono: string;
  fechaNacimiento: string;
  direccionPrincipal: string;
}

export interface AuthResponse {
  token: string;
  id?: string;
  nombre?: string;
  rol?: RolUsuario;
}
