import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TicketSales from './components/TicketSales';
import UserCreation from './components/UserCreation';
import Report from './components/Report';
import SendReport from './components/SendReport';
import AdditionalTicket from './components/AdditionalTicket';
import Sales from './components/Sales';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserCreation, setShowUserCreation] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    navigate('/register'); // Redirigir a la página de registro
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Venta de tickets</h1>
      </header>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/tickets" /> : <LoginForm onLoginSuccess={handleLoginSuccess} toggleUserCreation={toggleUserCreation} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/tickets" /> : <UserCreation onBackToLogin={toggleUserCreation} />} />
        <Route path="/tickets" element={isLoggedIn ? <TicketSales user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/report" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
        <Route path="/additional-ticket" element={isLoggedIn ? <AdditionalTicket /> : <Navigate to="/login" />} />
        <Route path="/sales" element={isLoggedIn ? <Sales /> : <Navigate to="/login" />} />
        <Route path="/send-report" element={isLoggedIn ? <SendReport /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;