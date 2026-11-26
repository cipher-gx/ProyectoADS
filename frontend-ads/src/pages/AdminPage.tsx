import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import '../style/cliente.css';

interface PropuestaAdmin {
  id: number;
  platillo: string;
  tipo: string;
  justificacion: string;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
}

const PROPUESTAS_MOCK: PropuestaAdmin[] = [
  { id: 1, platillo: 'Chilaquiles Verdes con Pollo', tipo: 'DESACTIVAR_TEMPORAL', justificacion: 'Stock de aguacate Hass por debajo del minimo.', estado: 'PENDIENTE' },
  { id: 2, platillo: 'Crema de Elote Rostizado', tipo: 'NUEVO_PLATILLO', justificacion: 'Platillo de temporada propuesto por cocina.', estado: 'PENDIENTE' },
];

export const AdminPage = () => {
  const [propuestas, setPropuestas] = useState<PropuestaAdmin[]>(PROPUESTAS_MOCK);

  const resolver = (id: number, estado: 'APROBADA' | 'RECHAZADA') => {
    setPropuestas((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
  };

  return (
    <div className="cliente-layout">
      <Navbar />
      <main className="cliente-container">
        <header className="cliente-header">
          <h1>Panel de Administracion</h1>
          <p>Autorizacion de cambios al menu propuestos por el Chef y resumen operativo.</p>
        </header>

        <section className="pedidos-grid">
          {propuestas.map((p) => (
            <article key={p.id} className="pedido-card">
              <div>
                <div className="pedido-top">
                  <span className="pedido-folio">{p.platillo}</span>
                  <span className={`badge-pedido ${p.estado === 'APROBADA' ? 'estado-ENTREGADO' : p.estado === 'RECHAZADA' ? 'estado-CANCELADO' : 'estado-PENDIENTE_ACEPTACION'}`}>
                    {p.estado}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>{p.tipo}</p>
                <p style={{ fontSize: '0.88rem', color: '#1e293b' }}>{p.justificacion}</p>
              </div>
              {p.estado === 'PENDIENTE' && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button type="button" className="btn-primario" onClick={() => resolver(p.id, 'APROBADA')}>Aprobar</button>
                  <button type="button" className="btn-cancelar-sm" style={{ marginTop: 0 }} onClick={() => resolver(p.id, 'RECHAZADA')}>Rechazar</button>
                </div>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};
