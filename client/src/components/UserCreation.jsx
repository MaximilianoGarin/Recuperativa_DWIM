import React, { useState } from 'react';
import { register } from '../service/api';

function UserCreation({ onBackToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await register({ name, email, password });

      console.log('User registered successfully:', data);
      onBackToLogin(); // Call the function to go back to login
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error. Por favor, intente nuevamente.');
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
      <button type="submit">Crear Usuario</button>
      <button type="button" onClick={onBackToLogin} className="back-btn">
        Volver al Login
      </button>
    </form>
  );
}

export default UserCreation;