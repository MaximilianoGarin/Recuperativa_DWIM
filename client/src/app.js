import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import TicketSales from './components/TicketSales';
import UserCreation from './components/UserCreation';
import { logout } from './service/api';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCreation, setShowUserCreation] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const toggleUserCreation = () => {
    setShowUserCreation(!showUserCreation);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserId(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Venta de tickets</h1>
        {isLoggedIn ? (
          <TicketSales userId={userId} onLogout={handleLogout} />
        ) : showUserCreation ? (
          <UserCreation onBackToLogin={toggleUserCreation} />
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