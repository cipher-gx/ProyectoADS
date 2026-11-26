import { useState, type FormEvent } from 'react';
import { Navbar } from '../components/Navbar';
import type { IngredienteInventario, PropuestaMenu } from '../types/chef.types';
import '../style/kds.css';

const INVENTARIO_INICIAL: IngredienteInventario[] = [
  { id: 1, nombre: 'Pechuga de Pollo', unidad: 'kg', stockActual: 14.5, stockMinimo: 5 },
  { id: 2, nombre: 'Aguacate Hass', unidad: 'kg', stockActual: 2.2, stockMinimo: 4 },
  { id: 3, nombre: 'Arrachera Marinada', unidad: 'kg', stockActual: 8.0, stockMinimo: 3 },
  { id: 4, nombre: 'Queso Manchego', unidad: 'kg', stockActual: 1.5, stockMinimo: 3 },
];

export const InventarioPage = () => {
  const [ingredientes, setIngredientes] = useState<IngredienteInventario[]>(INVENTARIO_INICIAL);
  const [platilloAfectado, setPlatilloAfectado] = useState('Chilaquiles Verdes con Pollo');
  const [tipoCambio, setTipoCambio] = useState<PropuestaMenu['tipoCambio']>('DESACTIVAR_TEMPORAL');
  const [justificacion, setJustificacion] = useState('');
  const [propuestas, setPropuestas] = useState<PropuestaMenu[]>([]);

  const ajustarStock = (id: number, delta: number) => {
    setIngredientes((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, stockActual: Math.max(0, Number((ing.stockActual + delta).toFixed(1))) } : ing))
    );
  };

  const handleEnviarPropuesta = (e: FormEvent) => {
    e.preventDefault();
    if (!justificacion.trim()) return;
    setPropuestas([{ id: Date.now(), platilloAfectado, tipoCambio, justificacion: justificacion.trim(), estado: 'ENVIADA' }, ...propuestas]);
    setJustificacion('');
  };

  return (
    <div className="inv-layout">
      <Navbar />
      <main className="inv-container">
        <div className="inv-workspace">
          <section className="inv-card">
            <h2 style={{ margin: '0 0 0.35rem 0', color: '#0f172a' }}>Existencias de Cocina</h2>
            <table className="inv-tabla">
              <thead>
                <tr><th>Insumo</th><th>Stock</th><th>Minimo</th><th>Estado</th><th>Ajuste</th></tr>
              </thead>
              <tbody>
                {ingredientes.map((ing) => {
                  const bajo = ing.stockActual <= ing.stockMinimo;
                  return (
                    <tr key={ing.id}>
                      <td><strong>{ing.nombre}</strong></td>
                      <td>{ing.stockActual} {ing.unidad}</td>
                      <td>{ing.stockMinimo} {ing.unidad}</td>
                      <td><span className={bajo ? 'stock-bajo' : 'stock-ok'}>{bajo ? 'STOCK BAJO' : 'OPTIMO'}</span></td>
                      <td>
                        <button type="button" onClick={() => ajustarStock(ing.id, -0.5)} style={{ marginRight: '0.35rem' }}>-0.5</button>
                        <button type="button" onClick={() => ajustarStock(ing.id, 1)}>+1</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <aside className="inv-card">
            <h2 style={{ margin: '0 0 0.35rem 0', color: '#0f172a' }}>Propuesta de Cambio al Menu</h2>
            <form onSubmit={handleEnviarPropuesta} className="propuesta-form">
              <div>
                <label htmlFor="platilloAfectado">Platillo</label>
                <input id="platilloAfectado" type="text" value={platilloAfectado} onChange={(e) => setPlatilloAfectado(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="tipoCambio">Tipo de solicitud</label>
                <select id="tipoCambio" value={tipoCambio} onChange={(e) => setTipoCambio(e.target.value as PropuestaMenu['tipoCambio'])}>
                  <option value="DESACTIVAR_TEMPORAL">Desactivar temporalmente por stock</option>
                  <option value="AJUSTE_INGREDIENTE">Sustituir ingrediente</option>
                  <option value="NUEVO_PLATILLO">Proponer platillo de temporada</option>
                </select>
              </div>
              <div>
                <label htmlFor="justificacion">Justificacion</label>
                <textarea id="justificacion" rows={3} value={justificacion} onChange={(e) => setJustificacion(e.target.value)} required />
              </div>
              <button type="submit" className="btn-simular" style={{ width: '100%', padding: '0.7rem' }}>Enviar Propuesta</button>
            </form>
            {propuestas.map((p) => (
              <div key={p.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem', marginTop: '0.6rem', fontSize: '0.82rem' }}>
                <strong>{p.platilloAfectado}</strong> ({p.tipoCambio})
                <p style={{ margin: '0.25rem 0 0 0', color: '#475569' }}>{p.justificacion}</p>
              </div>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
};
