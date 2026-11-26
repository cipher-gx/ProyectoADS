import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../style/inicio.css';

export default function InicioPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="inicio-contenedor">
      <div className="inicio-tarjeta">
        <h1>Sistema del Restaurante</h1>
        <p>Bienvenido. Tu sesión se ha iniciado correctamente.</p>
        <button onClick={handleLogout} className="btn-cerrar-sesion">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
