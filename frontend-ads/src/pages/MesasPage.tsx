import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import '../style/cliente.css';

interface Mesa {
  id: number;
  numero: string;
  zona: 'Salón Central' | 'Terraza' | 'Ventana';
  capacidad: number;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'RESERVADA' | 'LIMPIEZA';
  meseroAsignado?: string;
}

const MESAS_INICIALES: Mesa[] = [
  { id: 1, numero: 'M-01', zona: 'Salón Central', capacidad: 4, estado: 'OCUPADA', meseroAsignado: 'Turno Actual' },
  { id: 2, numero: 'M-02', zona: 'Salón Central', capacidad: 2, estado: 'DISPONIBLE' },
  { id: 3, numero: 'M-03', zona: 'Terraza', capacidad: 6, estado: 'RESERVADA', meseroAsignado: 'RES-904' },
  { id: 4, numero: 'M-04', zona: 'Terraza', capacidad: 4, estado: 'OCUPADA', meseroAsignado: 'Turno Actual' },
  { id: 5, numero: 'M-05', zona: 'Ventana', capacidad: 2, estado: 'LIMPIEZA' },
  { id: 6, numero: 'M-06', zona: 'Ventana', capacidad: 4, estado: 'DISPONIBLE' },
];

export const MesasPage = () => {
  const [mesas, setMesas] = useState<Mesa[]>(MESAS_INICIALES);

  const cambiarEstado = (id: number, nuevoEstado: Mesa['estado']) => {
    setMesas((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, estado: nuevoEstado, meseroAsignado: nuevoEstado === 'OCUPADA' ? 'Turno Actual' : undefined }
          : m
      )
    );
  };

  const claseBadge = (estado: Mesa['estado']) => {
    if (estado === 'DISPONIBLE') return 'estado-ENTREGADO';
    if (estado === 'OCUPADA') return 'estado-CANCELADO';
    if (estado === 'RESERVADA') return 'estado-EN_PREPARACION';
    return 'estado-PENDIENTE_ACEPTACION';
  };

  return (
    <div className="cliente-layout">
      <Navbar />
      <main className="cliente-container">
        <header className="cliente-header">
          <h1>Mapa de Mesas en Tiempo Real</h1>
          <p>Control de disponibilidad de salón, apertura de mesas y seguimiento de reservaciones.</p>
        </header>

        <section className="pedidos-grid">
          {mesas.map((mesa) => (
            <article key={mesa.id} className="pedido-card">
              <div>
                <div className="pedido-top">
                  <span className="pedido-folio">{mesa.numero} — {mesa.zona}</span>
                  <span className={`badge-pedido ${claseBadge(mesa.estado)}`}>{mesa.estado}</span>
                </div>
                <p style={{ margin: '0.25rem 0', fontSize: '0.88rem', color: '#334155' }}>
                  Capacidad: <strong>{mesa.capacidad} personas</strong>
                </p>
                {mesa.meseroAsignado && (
                  <p style={{ margin: '0.25rem 0', fontSize: '0.82rem', color: '#64748b' }}>
                    Asignación: {mesa.meseroAsignado}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                {mesa.estado !== 'OCUPADA' && (
                  <button type="button" className="btn-primario" onClick={() => cambiarEstado(mesa.id, 'OCUPADA')}>
                    Ocupar Mesa
                  </button>
                )}
                {mesa.estado === 'OCUPADA' && (
                  <button type="button" className="btn-cancelar-sm" style={{ marginTop: 0 }} onClick={() => cambiarEstado(mesa.id, 'LIMPIEZA')}>
                    Liberar a Limpieza
                  </button>
                )}
                {mesa.estado === 'LIMPIEZA' && (
                  <button type="button" className="btn-primario" onClick={() => cambiarEstado(mesa.id, 'DISPONIBLE')}>
                    Marcar Disponible
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};
