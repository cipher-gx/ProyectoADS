import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import type { PedidoCliente } from '../types/cliente.types';
import '../style/cliente.css';

const PEDIDOS_INICIALES: PedidoCliente[] = [
  {
    id: 1,
    folio: 'ORD-204',
    fechaHora: 'Hoy, 14:02',
    direccionEntrega: 'Av. Instituto Politecnico Nacional 2580, CDMX',
    itemsResumen: ['2x Chilaquiles Verdes con Pollo (Extra aguacate)', '1x Agua Fresca de Horchata'],
    subtotal: 401,
    descuento: 40.1,
    propina: 25,
    total: 385.9,
    estado: 'PENDIENTE_ACEPTACION',
    minutosTranscurridos: 2,
  },
  {
    id: 2,
    folio: 'ORD-198',
    fechaHora: 'Hoy, 13:15',
    direccionEntrega: 'Av. Instituto Politecnico Nacional 2580, CDMX',
    itemsResumen: ['1x Arrachera a la Parrilla (250g)', '1x Bowl Mediterraneo Vegano'],
    subtotal: 395,
    descuento: 0,
    propina: 30,
    total: 425,
    estado: 'EN_CAMINO',
    minutosTranscurridos: 28,
  },
  {
    id: 3,
    folio: 'ORD-175',
    fechaHora: 'Ayer, 20:10',
    direccionEntrega: 'Calle Lindavista 412, CDMX',
    itemsResumen: ['2x Enchiladas Suizas'],
    subtotal: 330,
    descuento: 33,
    propina: 20,
    total: 317,
    estado: 'ENTREGADO',
    minutosTranscurridos: 1440,
  },
];

export const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<PedidoCliente[]>(PEDIDOS_INICIALES);

  const handleCancelarPedido = (id: number) => {
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado: 'CANCELADO' } : p)));
  };

  return (
    <div className="cliente-layout">
      <Navbar />
      <main className="cliente-container">
        <header className="cliente-header">
          <h1>Mis Pedidos a Domicilio</h1>
          <p>Seguimiento en tiempo real. Cancelacion directa disponible dentro de los primeros 5 minutos.</p>
        </header>

        <section className="pedidos-grid">
          {pedidos.map((ped) => {
            const puedeCancelar = ped.estado === 'PENDIENTE_ACEPTACION' && ped.minutosTranscurridos <= 5;
            return (
              <article key={ped.id} className="pedido-card">
                <div>
                  <div className="pedido-top">
                    <span className="pedido-folio">{ped.folio}</span>
                    <span className={`badge-pedido estado-${ped.estado}`}>{ped.estado.replace('_', ' ')}</span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.84rem', color: '#64748b' }}>
                    {ped.fechaHora} - {ped.direccionEntrega}
                  </p>
                  <ul style={{ paddingLeft: '1.1rem', margin: '0.75rem 0', fontSize: '0.88rem', color: '#1e293b' }}>
                    {ped.itemsResumen.map((it, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{it}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Subtotal / Desc. / Propina:</span>
                    <span>${ped.subtotal.toFixed(2)} / -${ped.descuento.toFixed(2)} / +${ped.propina.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginTop: '0.35rem' }}>
                    <span>Total Pagado:</span>
                    <span>${ped.total.toFixed(2)} MXN</span>
                  </div>

                  {puedeCancelar && (
                    <button type="button" className="btn-cancelar-sm" onClick={() => handleCancelarPedido(ped.id)}>
                      Cancelar Pedido ({5 - ped.minutosTranscurridos} min restantes)
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};
