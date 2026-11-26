import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import type { OrdenKds } from '../types/chef.types';
import '../style/kds.css';

const LIMITE_ACTIVAS = 10;
const LIMITE_STANDBY = 10;

const ORDENES_INICIALES: OrdenKds[] = [
  {
    id: 1,
    folio: 'ORD-204',
    tipo: 'DOMICILIO',
    referencia: 'Av. IPN 2580 (3.2 km)',
    estado: 'PENDIENTE_ACEPTACION',
    segundosRestantesAceptacion: 265,
    horaIngreso: '14:02',
    items: [
      { id: 1, nombre: 'Chilaquiles Verdes con Pollo', cantidad: 2, modificadores: ['Extra aguacate'] },
      { id: 2, nombre: 'Agua Fresca de Horchata', cantidad: 1 },
    ],
  },
  {
    id: 2,
    folio: 'ORD-201',
    tipo: 'SALON',
    referencia: 'Mesa #2 - Carlos Mendez',
    estado: 'EN_PREPARACION',
    segundosRestantesAceptacion: 0,
    horaIngreso: '13:50',
    items: [{ id: 3, nombre: 'Enchiladas Suizas', cantidad: 2, modificadores: ['Arroz rojo'] }],
  },
  {
    id: 3,
    folio: 'ORD-202',
    tipo: 'DOMICILIO',
    referencia: 'Calle Lindavista 412 (1.8 km)',
    estado: 'EN_PREPARACION',
    segundosRestantesAceptacion: 0,
    horaIngreso: '13:54',
    items: [{ id: 4, nombre: 'Arrachera a la Parrilla (250g)', cantidad: 1, modificadores: ['Papas a la francesa'] }],
  },
  {
    id: 4,
    folio: 'ORD-203',
    tipo: 'SALON',
    referencia: 'Mesa #5 - Luis Torres',
    estado: 'STANDBY',
    segundosRestantesAceptacion: 0,
    horaIngreso: '13:58',
    items: [{ id: 6, nombre: 'Molletes Tradicionales', cantidad: 3, modificadores: ['Con chorizo dorado'] }],
  },
];

export const KdsPage = () => {
  const [ordenes, setOrdenes] = useState<OrdenKds[]>(ORDENES_INICIALES);
  const [contadorFolio, setContadorFolio] = useState(205);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setOrdenes((prev) =>
        prev.map((ord) => {
          if (ord.estado !== 'PENDIENTE_ACEPTACION') return ord;
          if (ord.segundosRestantesAceptacion <= 1) return { ...ord, segundosRestantesAceptacion: 0, estado: 'EXPIRADA' };
          return { ...ord, segundosRestantesAceptacion: ord.segundosRestantesAceptacion - 1 };
        })
      );
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const pendientes = ordenes.filter((o) => o.estado === 'PENDIENTE_ACEPTACION');
  const activas = ordenes.filter((o) => o.estado === 'EN_PREPARACION');
  const standby = ordenes.filter((o) => o.estado === 'STANDBY');

  const formatearSegundos = (seg: number) => `${Math.floor(seg / 60)}:${seg % 60 < 10 ? '0' : ''}${seg % 60}`;

  const handleAceptarOrden = (id: number) => {
    if (activas.length >= LIMITE_ACTIVAS && standby.length >= LIMITE_STANDBY) {
      alert('Capacidad maxima KDS alcanzada (10 activas + 10 STANDBY).');
      return;
    }
    const nuevoEstado = activas.length < LIMITE_ACTIVAS ? 'EN_PREPARACION' : 'STANDBY';
    setOrdenes((prev) => prev.map((o) => (o.id === id ? { ...o, estado: nuevoEstado } : o)));
  };

  const handleRechazarOrden = (id: number) => setOrdenes((prev) => prev.filter((o) => o.id !== id));

  const handleMarcarLista = (id: number) => {
    setOrdenes((prev) => {
      const sinCompletada = prev.map((o) => (o.id === id ? { ...o, estado: 'LISTA' as const } : o));
      const primeraStandby = sinCompletada.find((o) => o.estado === 'STANDBY');
      if (!primeraStandby) return sinCompletada;
      return sinCompletada.map((o) => (o.id === primeraStandby.id ? { ...o, estado: 'EN_PREPARACION' as const } : o));
    });
  };

  const handleSimularNuevaOrden = () => {
    const nueva: OrdenKds = {
      id: Date.now(),
      folio: `ORD-${contadorFolio}`,
      tipo: contadorFolio % 2 === 0 ? 'DOMICILIO' : 'SALON',
      referencia: contadorFolio % 2 === 0 ? 'Col. Zacatenco (2.4 km)' : `Mesa #${(contadorFolio % 6) + 1}`,
      estado: 'PENDIENTE_ACEPTACION',
      segundosRestantesAceptacion: 300,
      horaIngreso: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [{ id: Date.now() + 1, nombre: 'Chilaquiles Verdes con Pollo', cantidad: 1 }],
    };
    setContadorFolio((c) => c + 1);
    setOrdenes((prev) => [nueva, ...prev]);
  };
  return (
    <div className="kds-layout">
      <Navbar />
      <main className="kds-container">
        <header className="kds-topbar">
          <div>
            <h1>Monitor de Cocina KDS (10 + 10)</h1>
            <p>Ventana de aceptacion de 5 min - Cola STANDBY con promocion automatica FIFO.</p>
          </div>
          <div className="kds-metricas">
            <span className={`metrica-pill ${activas.length >= LIMITE_ACTIVAS ? 'llena' : ''}`}>Activas: {activas.length} / {LIMITE_ACTIVAS}</span>
            <span className={`metrica-pill ${standby.length >= LIMITE_STANDBY ? 'llena' : ''}`}>STANDBY: {standby.length} / {LIMITE_STANDBY}</span>
            <button type="button" className="btn-simular" onClick={handleSimularNuevaOrden}>+ Simular Orden Entrante</button>
          </div>
        </header>

        {pendientes.length > 0 && (
          <section className="kds-seccion">
            <div className="kds-seccion-titulo"><h2>Pendientes de Aceptacion ({pendientes.length})</h2></div>
            <div className="kds-grid">
              {pendientes.map((ord) => (
                <article key={ord.id} className="ticket-card estado-PENDIENTE_ACEPTACION">
                  <div>
                    <div className="ticket-header">
                      <span className="ticket-folio">{ord.folio}</span>
                      <span className="ticket-tipo">{ord.tipo}</span>
                    </div>
                    <p className="ticket-ref">{ord.referencia} - {ord.horaIngreso}</p>
                    <div className={`timer-box ${ord.segundosRestantesAceptacion < 60 ? 'critico' : ''}`}>
                      Tiempo para aceptar: {formatearSegundos(ord.segundosRestantesAceptacion)}
                    </div>
                    <ul className="ticket-items">
                      {ord.items.map((it) => (
                        <li key={it.id}>
                          <strong>{it.cantidad}x {it.nombre}</strong>
                          {it.modificadores && <span className="ticket-mods">{it.modificadores.join(', ')}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ticket-acciones">
                    <button type="button" className="btn-kds btn-aceptar" onClick={() => handleAceptarOrden(ord.id)}>Aceptar</button>
                    <button type="button" className="btn-kds btn-rechazar" onClick={() => handleRechazarOrden(ord.id)}>Rechazar</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="kds-seccion">
          <div className="kds-seccion-titulo"><h2>En Preparacion ({activas.length} / {LIMITE_ACTIVAS})</h2></div>
          <div className="kds-grid">
            {activas.map((ord) => (
              <article key={ord.id} className="ticket-card estado-EN_PREPARACION">
                <div>
                  <div className="ticket-header">
                    <span className="ticket-folio">{ord.folio}</span>
                    <span className="ticket-tipo">{ord.tipo}</span>
                  </div>
                  <p className="ticket-ref">{ord.referencia} - Ingreso {ord.horaIngreso}</p>
                  <ul className="ticket-items">
                    {ord.items.map((it) => (
                      <li key={it.id}>
                        <strong>{it.cantidad}x {it.nombre}</strong>
                        {it.modificadores && <span className="ticket-mods">{it.modificadores.join(', ')}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ticket-acciones">
                  <button type="button" className="btn-kds btn-listo" onClick={() => handleMarcarLista(ord.id)}>Marcar Platillos Listos</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kds-seccion">
          <div className="kds-seccion-titulo"><h2>Cola STANDBY FIFO ({standby.length} / {LIMITE_STANDBY})</h2></div>
          {standby.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No hay ordenes en espera FIFO.</p>
          ) : (
            <div className="kds-grid">
              {standby.map((ord, index) => (
                <article key={ord.id} className="ticket-card estado-STANDBY">
                  <div>
                    <div className="ticket-header">
                      <span className="ticket-folio">#{index + 1} - {ord.folio}</span>
                      <span className="ticket-tipo">EN ESPERA</span>
                    </div>
                    <p className="ticket-ref">{ord.referencia} - Ingreso {ord.horaIngreso}</p>
                    <ul className="ticket-items">
                      {ord.items.map((it) => (<li key={it.id}><strong>{it.cantidad}x {it.nombre}</strong></li>))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
