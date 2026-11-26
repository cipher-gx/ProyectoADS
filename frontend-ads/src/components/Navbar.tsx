import { Link, useNavigate } from 'react-router-dom';
import type { RolUsuario } from '../types/auth.types';
import '../style/navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const rol = (localStorage.getItem('rol') as RolUsuario) || 'CLIENTE';
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/inicio">Restaurante</Link>
        <span className="navbar-role">{rol}</span>
      </div>

      <div className="navbar-links">
        <Link to="/inicio">Inicio</Link>

        {rol === 'CLIENTE' && (
          <>
            <Link to="/menu">Menú</Link>
            <Link to="/pedidos">Mis Pedidos</Link>
            <Link to="/reservaciones">Reservaciones</Link>
          </>
        )}

        {rol === 'MESERO' && (
          <>
            <Link to="/mesas">Mapa de Mesas</Link>
            <Link to="/comandas">Comandas</Link>
          </>
        )}

        {rol === 'CHEF' && (
          <>
            <Link to="/kds">Tablero KDS</Link>
            <Link to="/inventario">Inventario</Link>
          </>
        )}
      </div>

      <div className="navbar-user">
        <span>{nombre}</span>
        <button type="button" onClick={handleLogout} className="btn-logout">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};
