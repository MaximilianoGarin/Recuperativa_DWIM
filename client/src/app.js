import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import TicketSales from './components/TicketSales';
import UserCreation from './components/UserCreation';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCreation, setShowUserCreation] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleUserCreation = () => {
    setShowUserCreation(!showUserCreation);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Venta de tickets</h1>
        {isLoggedIn ? (
          <TicketSales user={user} onLogout={handleLogout} />
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