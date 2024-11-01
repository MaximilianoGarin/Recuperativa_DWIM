import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import TicketSales from './components/TicketSales';
import UserCreation from './components/UserCreation';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCreation, setShowUserCreation] = useState(false);
  const [userId, setUserId] = useState(null); // Agrega un estado para el userId

  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId); // Guarda el userId cuando el usuario inicie sesión
  };

  const toggleUserCreation = () => {
    setShowUserCreation(!showUserCreation);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Venta de tickets</h1>
        {isLoggedIn ? (
          <TicketSales userId={userId} /> // Pasa el userId al componente TicketSales
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