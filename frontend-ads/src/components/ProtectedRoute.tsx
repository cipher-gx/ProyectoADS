import { Navigate } from 'react-router-dom';
import type { RolUsuario } from '../types/auth.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  rolesPermitidos?: RolUsuario[];
}

export const ProtectedRoute = ({ children, rolesPermitidos }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol') as RolUsuario | null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && rol && !rolesPermitidos.includes(rol)) {
    return <Navigate to="/inicio" replace />;
  }

  return <>{children}</>;
};
