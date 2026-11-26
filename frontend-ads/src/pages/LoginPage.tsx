import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../style/auth.css';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ correo, password });
      navigate('/inicio');
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-contenedor">
      <div className="auth-tarjeta">
        <h2>Iniciar Sesión</h2>
        {error && <p className="mensaje-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-formulario">
          <div className="campo-grupo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-principal">
            Entrar
          </button>
        </form>

        <p className="auth-pie">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
