import React, { useState } from 'react';
import { login } from '../service/api';

function LoginForm({ onLoginSuccess }) {
  const [id_user, setIdUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login({ id_user, password });

      console.log('Login successful:', data);
      onLoginSuccess(data.user); // Pasa el objeto user al componente principal
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="id_user">ID de Usuario:</label>
        <input
          type="text"
          id="id_user"
          value={id_user}
          onChange={(e) => setIdUser(e.target.value)}
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;