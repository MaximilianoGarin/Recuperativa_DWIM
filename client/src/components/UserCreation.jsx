import React, { useState } from 'react';

function UserCreation({ onBackToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User created successfully:', data);
        alert('Usuario creado exitosamente. Por favor, inicie sesión.');
        onBackToLogin();
      } else {
        setError(data.message || 'Error al crear usuario. Por favor, intente nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-creation-form">
      <h2>Creación de Usuario</h2>
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
        <label htmlFor="email">Email:</label>
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