import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import { InicioPage } from './pages/InicioPage';
import { MenuPage } from './pages/MenuPage';
import { PedidosPage } from './pages/PedidosPage';
import { ReservacionesPage } from './pages/ReservacionesPage';
import { MesasPage } from './pages/MesasPage';
import { ComandasPage } from './pages/ComandasPage';
import { KdsPage } from './pages/KdsPage';
import { InventarioPage } from './pages/InventarioPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/inicio" element={<ProtectedRoute><InicioPage /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute rolesPermitidos={['CLIENTE']}><MenuPage /></ProtectedRoute>} />
        <Route path="/pedidos" element={<ProtectedRoute rolesPermitidos={['CLIENTE']}><PedidosPage /></ProtectedRoute>} />
        <Route path="/reservaciones" element={<ProtectedRoute rolesPermitidos={['CLIENTE']}><ReservacionesPage /></ProtectedRoute>} />
        <Route path="/mesas" element={<ProtectedRoute rolesPermitidos={['MESERO']}><MesasPage /></ProtectedRoute>} />
        <Route path="/comandas" element={<ProtectedRoute rolesPermitidos={['MESERO']}><ComandasPage /></ProtectedRoute>} />
        <Route path="/kds" element={<ProtectedRoute rolesPermitidos={['CHEF']}><KdsPage /></ProtectedRoute>} />
        <Route path="/inventario" element={<ProtectedRoute rolesPermitidos={['CHEF']}><InventarioPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
