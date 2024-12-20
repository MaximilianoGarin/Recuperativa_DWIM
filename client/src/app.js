
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TicketSales from './components/TicketSales';
import UserCreation from './components/UserCreation';
import UserManagement from './components/UserManagement';  // Importamos el nuevo componente
import Report from './components/Report';
import SendReport from './components/SendReport';
import AdditionalTicket from './components/AdditionalTicket';
import Sales from './components/Sales';
import AdminDashboard from './components/AdminDashboard';
import DefineTickets from './components/DefineTickets';
import DefineServices from './components/DefineServices';
import TicketAudith from './components/TicketAudith';  
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    if (userData.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/tickets');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestión de Tickets</h1>
      </header>
      <div className="App-content">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to={user?.role === 'admin' ? '/admin' : '/tickets'} /> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/user-creation" element={<UserCreation />} />
          <Route path="/user-management" element={isLoggedIn && user?.role === 'admin' ? <UserManagement /> : <Navigate to="/login" />} /> {/* Nueva ruta para gestión de usuarios */}
          <Route path="/tickets" element={isLoggedIn && user?.role !== 'admin' ? <TicketSales user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn && user?.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/report" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
          <Route path="/additional-ticket" element={isLoggedIn ? <AdditionalTicket /> : <Navigate to="/login" />} />
          <Route path="/sales" element={isLoggedIn ? <Sales /> : <Navigate to="/login" />} />
          <Route path="/send-report" element={isLoggedIn ? <SendReport /> : <Navigate to="/login" />} />
          <Route path="/define-tickets" element={isLoggedIn && user?.role === 'admin' ? <DefineTickets /> : <Navigate to="/login" />} />
          <Route path="/define-services" element={isLoggedIn && user?.role === 'admin' ? <DefineServices /> : <Navigate to="/login" />} />
          <Route path="/ticket-audith" element={isLoggedIn && user?.role === 'admin' ? <TicketAudith /> : <Navigate to="/login" />} /> 
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
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
