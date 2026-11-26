import { useState, type FormEvent } from 'react';
import { Navbar } from '../components/Navbar';
import type { ReservacionCliente } from '../types/cliente.types';
import '../style/cliente.css';

const RESERVACIONES_INICIALES: ReservacionCliente[] = [
  {
    id: 1,
    codigo: 'RES-904',
    fecha: '2026-11-28',
    hora: '14:30',
    comensales: 4,
    zonaPreferida: 'Terraza',
    consumoEstimado: 800,
    anticipoPagado: 400,
    estado: 'CONFIRMADA',
    notas: 'Mesa cerca de sombra',
  },
];

export const ReservacionesPage = () => {
  const [reservaciones, setReservaciones] = useState<ReservacionCliente[]>(RESERVACIONES_INICIALES);
  const [fecha, setFecha] = useState('2026-11-29');
  const [hora, setHora] = useState('15:00');
  const [comensales, setComensales] = useState(2);
  const [zonaPreferida, setZonaPreferida] = useState<ReservacionCliente['zonaPreferida']>('Salón Central');
  const [notas, setNotas] = useState('');

  const consumoEstimado = comensales * 200;
  const anticipoRequerido = consumoEstimado * 0.5;

  const handleCrearReservacion = (e: FormEvent) => {
    e.preventDefault();
    const nueva: ReservacionCliente = {
      id: Date.now(),
      codigo: `RES-${Math.floor(100 + Math.random() * 900)}`,
      fecha,
      hora,
      comensales,
      zonaPreferida,
      consumoEstimado,
      anticipoPagado: anticipoRequerido,
      estado: 'CONFIRMADA',
      notas: notas.trim() || undefined,
    };
    setReservaciones([nueva, ...reservaciones]);
    setNotas('');
  };

  return (
    <div className="cliente-layout">
      <Navbar />
      <main className="cliente-container">
        <header className="cliente-header">
          <h1>Reservacion de Mesa en Salon</h1>
          <p>Asegura tu mesa cubriendo el anticipo obligatorio del 50% sobre el consumo minimo estimado ($200 MXN/persona).</p>
        </header>

        <div className="res-workspace">
          <section className="res-card">
            <h2 style={{ margin: '0 0 0.35rem 0', color: '#0f172a' }}>Nueva Reservacion</h2>
            <form onSubmit={handleCrearReservacion} className="res-form">
              <div>
                <label htmlFor="resFecha">Fecha</label>
                <input id="resFecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="resHora">Hora</label>
                <input id="resHora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="resComensales">Numero de comensales (1 a 10)</label>
                <input id="resComensales" type="number" min={1} max={10} value={comensales} onChange={(e) => setComensales(Math.max(1, Number(e.target.value)))} required />
              </div>
              <div>
                <label htmlFor="resZona">Zona preferida</label>
                <select id="resZona" value={zonaPreferida} onChange={(e) => setZonaPreferida(e.target.value as ReservacionCliente['zonaPreferida'])}>
                  <option value="Salón Central">Salon Central</option>
                  <option value="Terraza">Terraza</option>
                  <option value="Ventana">Ventana</option>
                  <option value="Salón Privado">Salon Privado</option>
                </select>
              </div>
              <div>
                <label htmlFor="resNotas">Notas adicionales (opcional)</label>
                <textarea id="resNotas" rows={2} placeholder="Ej. Silla para bebe o aniversario" value={notas} onChange={(e) => setNotas(e.target.value)} />
              </div>

              <div className="anticipo-box">
                <div>Consumo minimo estimado: <strong>${consumoEstimado.toFixed(2)} MXN</strong></div>
                <div style={{ marginTop: '0.25rem', fontSize: '0.95rem' }}>
                  Anticipo obligatorio (50%): <strong>${anticipoRequerido.toFixed(2)} MXN</strong>
                </div>
              </div>

              <button type="submit" className="btn-primario">Confirmar y Cubrir Anticipo (50%)</button>
            </form>
          </section>

          <section className="res-card">
            <h2 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>Mis Reservaciones Activas</h2>
            {reservaciones.map((res) => (
              <article key={res.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: '0.85rem' }}>
                <div className="pedido-top">
                  <span className="pedido-folio">{res.codigo} - {res.zonaPreferida}</span>
                  <span className="badge-pedido estado-ENTREGADO">{res.estado}</span>
                </div>
                <p style={{ margin: '0.25rem 0', fontSize: '0.88rem', color: '#334155' }}>
                  Fecha: <strong>{res.fecha}</strong> a las <strong>{res.hora} hrs</strong> - <strong>{res.comensales} personas</strong>
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#15803d' }}>
                  Anticipo del 50% acreditado: <strong>${res.anticipoPagado.toFixed(2)} MXN</strong> (de ${res.consumoEstimado.toFixed(2)} MXN)
                </p>
                {res.notas && <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>Nota: {res.notas}</p>}
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};
