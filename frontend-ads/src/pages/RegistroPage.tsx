import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../style/auth.css';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    fechaNacimiento: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authService.registro(formData);
      alert('Registro exitoso. Ahora inicia sesión.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al registrar usuario. Verifica tus datos.');
    }
  };

  return (
    <div className="auth-contenedor">
      <div className="auth-tarjeta">
        <h2>Crear Cuenta</h2>
        {error && <p className="mensaje-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-formulario">
          <div className="campo-grupo">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Juan Pérez"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              placeholder="5512345678"
              minLength={10}
              maxLength={15}
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              required
            />
          </div>

          <div className="campo-grupo">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              id="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-principal">
            Registrarse
          </button>
        </form>

        <p className="auth-pie">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
