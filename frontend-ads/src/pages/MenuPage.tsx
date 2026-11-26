import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import type {
  CategoriaMenu,
  ItemCarrito,
  ModificadorPlatillo,
  Platillo,
} from '../types/menu.types';
import '../style/menu.css';

const PLATILLOS_CATALOGO: Platillo[] = [
  {
    id: 1,
    nombre: 'Chilaquiles Verdes con Pollo',
    descripcion: 'Totopos crujientes bañados en salsa verde asada, crema, queso fresco y pechuga deshebrada.',
    precioBase: 145,
    categoria: 'DESAYUNO',
    tiempoPrepMin: 15,
    disponible: true,
    modificadores: [
      { id: 101, nombre: 'Huevo estrellado extra', costoExtra: 22 },
      { id: 102, nombre: 'Extra aguacate', costoExtra: 28 },
      { id: 103, nombre: 'Sin cebolla', costoExtra: 0 },
    ],
  },
  {
    id: 2,
    nombre: 'Molletes Tradicionales (3 pzas)',
    descripcion: 'Bolillo artesanal con frijoles refritos, queso manchego gratinado y pico de gallo.',
    precioBase: 110,
    categoria: 'DESAYUNO',
    tiempoPrepMin: 12,
    disponible: true,
    modificadores: [
      { id: 104, nombre: 'Con chorizo dorado', costoExtra: 25 },
      { id: 105, nombre: 'Extra queso gratinado', costoExtra: 20 },
    ],
  },
  {
    id: 3,
    nombre: 'Enchiladas Suizas',
    descripcion: 'Tortillas rellenas de pollo bañadas en salsa cremosa de tomatillo y gratinadas.',
    precioBase: 165,
    categoria: 'COMIDA',
    tiempoPrepMin: 18,
    disponible: true,
    modificadores: [
      { id: 106, nombre: 'Guarnición de arroz rojo', costoExtra: 18 },
      { id: 107, nombre: 'Extra crema y queso', costoExtra: 15 },
    ],
  },
  {
    id: 4,
    nombre: 'Arrachera a la Parrilla (250g)',
    descripcion: 'Corte marinado acompañado de guacamole, cebollitas cambray y tortillas hechas a mano.',
    precioBase: 245,
    categoria: 'CENA',
    tiempoPrepMin: 22,
    disponible: true,
    modificadores: [
      { id: 108, nombre: 'Papas a la francesa', costoExtra: 35 },
      { id: 109, nombre: 'Queso fundido aparte', costoExtra: 40 },
    ],
  },
  {
    id: 5,
    nombre: 'Bowl Mediterráneo Vegano',
    descripcion: 'Quinoa, garbanzos especiados, pepino, aceitunas negras, jitomate cherry y aderezo tahini.',
    precioBase: 150,
    categoria: 'VEGETARIANO',
    tiempoPrepMin: 12,
    disponible: true,
    modificadores: [
      { id: 110, nombre: 'Tofu a la plancha', costoExtra: 30 },
      { id: 111, nombre: 'Sin aderezo', costoExtra: 0 },
    ],
  },
  {
    id: 6,
    nombre: 'Mini Hamburguesa con Papas',
    descripcion: 'Carne 100% res de 100g con queso americano, pan brioche suave y papas gajo horneadas.',
    precioBase: 115,
    categoria: 'INFANTIL',
    tiempoPrepMin: 14,
    disponible: true,
    modificadores: [
      { id: 112, nombre: 'Jugo de manzana 250ml', costoExtra: 20 },
      { id: 113, nombre: 'Sin vegetales', costoExtra: 0 },
    ],
  },
  {
    id: 7,
    nombre: 'Agua Fresca de Horchata (1 Litro)',
    descripcion: 'Preparada diariamente con arroz natural, canela y un toque de vainilla.',
    precioBase: 55,
    categoria: 'GENERAL',
    tiempoPrepMin: 5,
    disponible: true,
    modificadores: [
      { id: 114, nombre: 'Poco hielo', costoExtra: 0 },
    ],
  },
];

const CATEGORIAS: ('TODOS' | CategoriaMenu)[] = [
  'TODOS',
  'DESAYUNO',
  'COMIDA',
  'CENA',
  'GENERAL',
  'INFANTIL',
  'VEGETARIANO',
];

export const MenuPage = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<'TODOS' | CategoriaMenu>('TODOS');
  const [seleccionMods, setSeleccionMods] = useState<Record<number, number[]>>({});
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [direccionEntrega, setDireccionEntrega] = useState('Av. Instituto Politécnico Nacional 2580, CDMX');
  const [propina, setPropina] = useState<number>(20);
  const [codigoCupon, setCodigoCupon] = useState('');
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);
  const [mensajePedido, setMensajePedido] = useState('');

  const platillosFiltrados =
    categoriaActiva === 'TODOS'
      ? PLATILLOS_CATALOGO
      : PLATILLOS_CATALOGO.filter((p) => p.categoria === categoriaActiva);

  const toggleModificador = (platilloId: number, modId: number) => {
    const actuales = seleccionMods[platilloId] || [];
    const existe = actuales.includes(modId);
    setSeleccionMods({
      ...seleccionMods,
      [platilloId]: existe
        ? actuales.filter((id) => id !== modId)
        : [...actuales, modId],
    });
  };

  const handleAgregarAlCarrito = (platillo: Platillo) => {
    setMensajePedido('');
    const idsElegidos = seleccionMods[platillo.id] || [];
    const modsElegidos: ModificadorPlatillo[] = platillo.modificadores.filter((m) =>
      idsElegidos.includes(m.id)
    );
    const extraTotal = modsElegidos.reduce((acc, m) => acc + m.costoExtra, 0);
    const precioUnitarioFinal = platillo.precioBase + extraTotal;
    const uid = `${platillo.id}-${idsElegidos.sort().join('-')}`;

    setCarrito((prev) => {
      const existente = prev.find((item) => item.uid === uid);
      if (existente) {
        return prev.map((item) =>
          item.uid === uid ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [
        ...prev,
        {
          uid,
          platillo,
          modificadoresSeleccionados: modsElegidos,
          cantidad: 1,
          precioUnitarioFinal,
        },
      ];
    });
  };

  const cambiarCantidad = (uid: string, delta: number) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.uid === uid ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const handleAplicarCupon = () => {
    if (codigoCupon.trim().toUpperCase() === 'ESCOM10') {
      setDescuentoPorcentaje(10);
    } else {
      setDescuentoPorcentaje(0);
      alert('Cupón no válido. Prueba con ESCOM10 para 10% de descuento.');
    }
  };

  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precioUnitarioFinal * item.cantidad,
    0
  );
  const descuentoMonto = (subtotal * descuentoPorcentaje) / 100;
  const totalFinal = Math.max(0, subtotal - descuentoMonto + (carrito.length > 0 ? propina : 0));

  const handleConfirmarPedido = () => {
    if (carrito.length === 0) return;
    if (!direccionEntrega.trim()) {
      alert('Ingresa una dirección válida dentro del radio de 5 km.');
      return;
    }
    setMensajePedido(
      `Orden a domicilio enviada por $${totalFinal.toFixed(2)} MXN. El chef tiene 5 minutos para aceptarla en KDS.`
    );
    setCarrito([]);
    setDescuentoPorcentaje(0);
    setCodigoCupon('');
  };

  return (
    <div className="menu-layout">
      <Navbar />

      <main className="menu-container">
        <header className="menu-topbar">
          <h1>Menú del Restaurante</h1>
          <p>Filtra por turno o categoría, personaliza tus platillos y arma tu pedido exclusivamente a domicilio.</p>

          <div className="categorias-bar">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn-cat ${categoriaActiva === cat ? 'activa' : ''}`}
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="menu-workspace">
          <section className="platillos-grid">
            {platillosFiltrados.map((platillo) => {
              const idsMarcados = seleccionMods[platillo.id] || [];
              return (
                <article key={platillo.id} className="platillo-card">
                  <div>
                    <div className="platillo-header">
                      <h3>{platillo.nombre}</h3>
                      <span className="badge-cat">{platillo.categoria}</span>
                    </div>

                    <p className="platillo-desc">{platillo.descripcion}</p>

                    <div className="platillo-meta">
                      <span>Prep. aprox: {platillo.tiempoPrepMin} min</span>
                      <span className="platillo-precio">${platillo.precioBase.toFixed(2)}</span>
                    </div>

                    {platillo.modificadores.length > 0 && (
                      <div className="modificadores-box">
                        <span className="modificadores-titulo">Personalización / Extras:</span>
                        {platillo.modificadores.map((mod) => (
                          <div key={mod.id} className="modificador-opcion">
                            <label>
                              <input
                                type="checkbox"
                                checked={idsMarcados.includes(mod.id)}
                                onChange={() => toggleModificador(platillo.id, mod.id)}
                              />
                              <span>{mod.nombre}</span>
                            </label>
                            <span>
                              {mod.costoExtra > 0 ? `+$${mod.costoExtra}` : 'Gratis'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-agregar"
                    onClick={() => handleAgregarAlCarrito(platillo)}
                  >
                    + Agregar al carrito
                  </button>
                </article>
              );
            })}
          </section>

          <aside className="carrito-panel">
            <h2>Tu Pedido a Domicilio</h2>
            <div className="entrega-aviso">
              Modalidad única: <strong>Entrega a Domicilio</strong> (cobertura máx. 5 km desde sucursal; sin servicio Pick Up).
            </div>

            {carrito.length === 0 ? (
              <p className="carrito-vacio">Tu carrito está vacío. Selecciona platillos del menú.</p>
            ) : (
              <>
                <ul className="carrito-lista">
                  {carrito.map((item) => (
                    <li key={item.uid} className="carrito-item">
                      <div className="carrito-item-info">
                        <strong>{item.platillo.nombre}</strong>
                        {item.modificadoresSeleccionados.length > 0 && (
                          <div className="carrito-item-mods">
                            {item.modificadoresSeleccionados.map((m) => m.nombre).join(', ')}
                          </div>
                        )}
                        <div className="carrito-item-mods">
                          ${(item.precioUnitarioFinal * item.cantidad).toFixed(2)} MXN
                        </div>
                      </div>

                      <div className="carrito-item-controles">
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => cambiarCantidad(item.uid, -1)}
                        >
                          -
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => cambiarCantidad(item.uid, 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="carrito-campo">
                  <label htmlFor="direccionEntrega">Dirección de entrega (radio 5 km)</label>
                  <input
                    id="direccionEntrega"
                    type="text"
                    value={direccionEntrega}
                    onChange={(e) => setDireccionEntrega(e.target.value)}
                  />
                </div>

                <div className="carrito-campo">
                  <label htmlFor="propina">Propina voluntaria (MXN)</label>
                  <input
                    id="propina"
                    type="number"
                    min={0}
                    step={5}
                    value={propina}
                    onChange={(e) => setPropina(Math.max(0, Number(e.target.value)))}
                  />
                </div>

                <div className="carrito-campo">
                  <label htmlFor="cupon">Cupón promocional (ej. ESCOM10)</label>
                  <div className="cupon-row">
                    <input
                      id="cupon"
                      type="text"
                      placeholder="Código"
                      value={codigoCupon}
                      onChange={(e) => setCodigoCupon(e.target.value)}
                    />
                    <button type="button" className="btn-cupon" onClick={handleAplicarCupon}>
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="resumen-totales">
                  <div className="resumen-linea">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {descuentoMonto > 0 && (
                    <div className="resumen-linea" style={{ color: '#16a34a' }}>
                      <span>Descuento ({descuentoPorcentaje}%):</span>
                      <span>-${descuentoMonto.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="resumen-linea">
                    <span>Propina voluntaria:</span>
                    <span>${propina.toFixed(2)}</span>
                  </div>
                  <div className="resumen-total">
                    <span>Total a pagar:</span>
                    <span>${totalFinal.toFixed(2)} MXN</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-confirmar"
                  onClick={handleConfirmarPedido}
                >
                  Confirmar Pedido a Domicilio
                </button>
              </>
            )}

            {mensajePedido && <div className="pedido-ok">{mensajePedido}</div>}
          </aside>
        </div>
      </main>
    </div>
  );
};
