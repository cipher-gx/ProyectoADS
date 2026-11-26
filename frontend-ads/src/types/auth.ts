export interface RegistroRequest {
  correo: string;
  password: string;
  nombre: string;
  telefono: string;
  fechaNacimiento: string;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  mensaje?: string;
  nombre?: string;
  correo?: string;
  rol?: string;
}
