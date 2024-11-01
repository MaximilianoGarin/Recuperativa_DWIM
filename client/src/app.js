import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import TicketSales from './components/TicketSales';
import UserCreation from './components/UserCreation';
import AdminDashboard from './components/AdminDashboard';
import { login, register } from './service/api';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCreation, setShowUserCreation] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSuccess = async (credentials) => {
    try {
      const data = await login(credentials);
      setIsLoggedIn(true);
      setUserId(data.user._id);
      setIsAdmin(data.user.role === 'admin');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error al iniciar sesión. Por favor, intente nuevamente.');
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setShowUserCreation(false);
      setError('Usuario creado exitosamente. Por favor, inicie sesión.');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error al registrar usuario. Por favor, intente nuevamente.');
    }
  };

  const toggleUserCreation = () => {
    setShowUserCreation(!showUserCreation);
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setIsAdmin(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Venta de tickets</h1>
        {error && <p className="error-message">{error}</p>}
        {isLoggedIn ? (
          isAdmin ? (
            <AdminDashboard userId={userId} onLogout={handleLogout} />
          ) : (
            <TicketSales userId={userId} onLogout={handleLogout} />
          )
        ) : showUserCreation ? (
          <UserCreation onRegister={handleRegister} onBackToLogin={toggleUserCreation} />
        ) : (
          <>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <button onClick={toggleUserCreation} className="create-user-btn">
              Crear Usuario
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;