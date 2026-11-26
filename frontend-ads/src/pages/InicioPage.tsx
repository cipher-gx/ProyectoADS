import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import type { RolUsuario } from '../types/auth.types';
import '../style/inicio.css';

export const InicioPage = () => {
  const rol = (localStorage.getItem('rol') as RolUsuario) || 'CLIENTE';
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  return (
    <div className="inicio-layout">
      <Navbar />

      <main className="inicio-container">
        <header className="inicio-header">
          <h1>Bienvenido, {nombre}</h1>
          <p>Panel operativo activo — Perfil: <strong>{rol}</strong></p>
        </header>

        <section className="dashboard-grid">
          {rol === 'CLIENTE' && (
            <>
              <div className="dashboard-card">
                <div>
                  <h3>Menú por Turno</h3>
                  <p>Consulta los platillos activos de Desayuno, Comida, Cena y opciones especiales.</p>
                </div>
                <Link to="/menu" className="btn-card">Ver Menú</Link>
              </div>

              <div className="dashboard-card">
                <div>
                  <h3>Pedidos a Domicilio</h3>
                  <p>Arma tu orden dentro del radio de 5 km, aplica cupones y rastrea tu entrega.</p>
                </div>
                <Link to="/pedidos" className="btn-card">Mis Pedidos</Link>
              </div>

              <div className="dashboard-card">
                <div>
                  <h3>Reservaciones</h3>
                  <p>Aparta tu mesa con anticipo del 50% o administra tus citas programadas.</p>
                </div>
                <Link to="/reservaciones" className="btn-card">Reservar Mesa</Link>
              </div>
            </>
          )}

          {rol === 'MESERO' && (
            <>
              <div className="dashboard-card">
                <div>
                  <h3>Mapa de Mesas</h3>
                  <p>Visualiza disponibilidad en tiempo real, registra check-in y asigna lugares.</p>
                </div>
                <Link to="/mesas" className="btn-card">Abrir Mapa</Link>
              </div>

              <div className="dashboard-card">
                <div>
                  <h3>Comandas y Cuentas</h3>
                  <p>Toma pedidos en salón, modifica dentro de la ventana de 5 min y divide cuentas.</p>
                </div>
                <Link to="/comandas" className="btn-card">Gestionar Comandas</Link>
              </div>
            </>
          )}

          {rol === 'CHEF' && (
            <>
              <div className="dashboard-card">
                <div>
                  <h3>Tablero KDS (10 + 10)</h3>
                  <p>Acepta pedidos en 5 min, controla hasta 10 órdenes activas y cola STANDBY FIFO.</p>
                </div>
                <Link to="/kds" className="btn-card">Abrir Monitor KDS</Link>
              </div>

              <div className="dashboard-card">
                <div>
                  <h3>Inventario y Propuestas</h3>
                  <p>Consulta existencias de ingredientes y envía propuestas de modificación al menú.</p>
                </div>
                <Link to="/inventario" className="btn-card">Ver Inventario</Link>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};
