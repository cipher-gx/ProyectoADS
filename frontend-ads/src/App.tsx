import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import InicioPage from './pages/InicioPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/inicio" element={<InicioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
