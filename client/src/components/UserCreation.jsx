import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/api';

function UserCreation({ onBackToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('funcionario');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await register({ name, email, password, role });

      console.log('User registered successfully:', data);
      alert(`Usuario registrado exitosamente. Su ID de usuario es: ${data.id_user}`);
      navigate('/login'); // Redirigir al login después de crear el usuario
    } catch (error) {
      console.error('Error:', error);
      setError(error.response.data.error || 'Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-creation-form">
      <h2>Crear Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Rol:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="funcionario">Funcionario</option>
          <option value="admin">Administrador</option>
          <option value="cajero">Cajero</option>
        </select>
      </div>
      <button type="submit">Crear Usuario</button>
      <button type="button" onClick={() => navigate('/login')} className="back-btn">
        Volver al Login
      </button>
    </form>
  );
}

export default UserCreation;