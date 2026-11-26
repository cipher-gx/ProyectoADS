import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import '../style/cliente.css';

interface ItemComanda {
  id: number;
  platillo: string;
  cantidad: number;
  precioUnitario: number;
  comensal: number;
}

interface Comanda {
  id: number;
  folio: string;
  mesa: string;
  minutosTranscurridos: number;
  items: ItemComanda[];
  estado: 'ABIERTA' | 'CERRADA';
}

const COMANDAS_INICIALES: Comanda[] = [
  {
    id: 1,
    folio: 'CMD-101',
    mesa: 'M-01',
    minutosTranscurridos: 3,
    estado: 'ABIERTA',
    items: [
      { id: 1, platillo: 'Chilaquiles Verdes con Pollo', cantidad: 1, precioUnitario: 145, comensal: 1 },
      { id: 2, platillo: 'Arrachera a la Parrilla', cantidad: 1, precioUnitario: 240, comensal: 2 },
      { id: 3, platillo: 'Agua de Horchata', cantidad: 2, precioUnitario: 40, comensal: 1 },
    ],
  },
  {
    id: 2,
    folio: 'CMD-098',
    mesa: 'M-04',
    minutosTranscurridos: 18,
    estado: 'ABIERTA',
    items: [
      { id: 4, platillo: 'Enchiladas Suizas', cantidad: 2, precioUnitario: 165, comensal: 1 },
    ],
  },
];

export const ComandasPage = () => {
  const [comandas, setComandas] = useState<Comanda[]>(COMANDAS_INICIALES);
  const [dividirPorComensal, setDividirPorComensal] = useState<Record<number, boolean>>({});

  const agregarExtra = (comandaId: number) => {
    setComandas((prev) =>
      prev.map((c) =>
        c.id === comandaId
          ? {
              ...c,
              items: [
                ...c.items,
                { id: Date.now(), platillo: 'Café Americano', cantidad: 1, precioUnitario: 45, comensal: 1 },
              ],
            }
          : c
      )
    );
  };

  const cerrarCuenta = (comandaId: number) => {
    setComandas((prev) => prev.map((c) => (c.id === comandaId ? { ...c, estado: 'CERRADA' } : c)));
  };

  return (
    <div className="cliente-layout">
      <Navbar />
      <main className="cliente-container">
        <header className="cliente-header">
          <h1>Comandas de Salón y División de Cuenta</h1>
          <p>Modificación directa permitida dentro de la ventana de 5 minutos desde la captura inicial.</p>
        </header>

        <section className="pedidos-grid">
          {comandas.map((cmd) => {
            const puedeModificar = cmd.estado === 'ABIERTA' && cmd.minutosTranscurridos <= 5;
            const total = cmd.items.reduce((acc, it) => acc + it.cantidad * it.precioUnitario, 0);
            const dividir = Boolean(dividirPorComensal[cmd.id]);

            const totalesPorComensal = cmd.items.reduce<Record<number, number>>((acc, it) => {
              acc[it.comensal] = (acc[it.comensal] || 0) + it.cantidad * it.precioUnitario;
              return acc;
            }, {});

            return (
              <article key={cmd.id} className="pedido-card">
                <div>
                  <div className="pedido-top">
                    <span className="pedido-folio">{cmd.folio} — Mesa {cmd.mesa}</span>
                    <span className={`badge-pedido ${cmd.estado === 'ABIERTA' ? 'estado-EN_PREPARACION' : 'estado-ENTREGADO'}`}>
                      {cmd.estado}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem', color: '#64748b' }}>
                    Tiempo transcurrido: {cmd.minutosTranscurridos} min
                  </p>

                  <ul style={{ paddingLeft: '1.1rem', margin: '0.75rem 0', fontSize: '0.88rem', color: '#1e293b' }}>
                    {cmd.items.map((it) => (
                      <li key={it.id} style={{ marginBottom: '0.25rem' }}>
                        {it.cantidad}x {it.platillo} — ${(it.cantidad * it.precioUnitario).toFixed(2)} (Comensal {it.comensal})
                      </li>
                    ))}
                  </ul>

                  {dividir && (
                    <div className="anticipo-box" style={{ marginBottom: '0.75rem' }}>
                      <strong>Subcuentas por comensal:</strong>
                      {Object.entries(totalesPorComensal).map(([comensal, monto]) => (
                        <div key={comensal}>Comensal {comensal}: <strong>${monto.toFixed(2)} MXN</strong></div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '0.65rem' }}>
                    <span>Total Cuenta:</span>
                    <span>${total.toFixed(2)} MXN</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {puedeModificar && (
                      <button type="button" className="btn-primario" onClick={() => agregarExtra(cmd.id)}>
                        + Agregar Ítem ({5 - cmd.minutosTranscurridos}m)
                      </button>
                    )}
                    {cmd.estado === 'ABIERTA' && (
                      <>
                        <button
                          type="button"
                          className="btn-primario"
                          style={{ backgroundColor: '#475569' }}
                          onClick={() => setDividirPorComensal((prev) => ({ ...prev, [cmd.id]: !prev[cmd.id] }))}
                        >
                          {dividir ? 'Cuenta Única' : 'Dividir Cuenta'}
                        </button>
                        <button type="button" className="btn-cancelar-sm" style={{ marginTop: 0 }} onClick={() => cerrarCuenta(cmd.id)}>
                          Cerrar Cuenta
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};
