import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/admin-dashboard.css';

export default function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAction = async (action) => {
    setMessage('');
    try {
      switch (action) {
        case 'services':
          handleNavigation('/define-services');
          break;
        case 'tickets':
          handleNavigation('/define-tickets');
          break;
        case 'additional':
          handleNavigation('/additional-ticket');
          break;
        case 'reports':
          handleNavigation('/send-report');
          break;
        case 'createUser':
          handleNavigation('/user-creation');
          break;
        case 'users':
          handleNavigation('/user-management');
          break;
        case 'audit':
          handleNavigation('/ticket-audith');
          break;
        default:
          toast.info('Funcionalidad en desarrollo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
          <h1>Panel de Administración</h1>
          <Button onClick={onLogout} className="admin-dashboard-logout-button">
            Log out
          </Button>
        </div>
      </header>

      <main className="admin-dashboard-main-content">
        <div className="admin-dashboard-user-info-section">
          <span>Administrador: <strong>{user?.name}</strong></span>
          <br />
          <span>Rol: <strong>{user?.role}</strong></span>
        </div>

        <div className="admin-dashboard-controls">
          <h2>Funciones Administrativas</h2>
          {message && <p className="admin-dashboard-message">{message}</p>}

          <div className="admin-dashboard-grid">
            <div className="admin-dashboard-section">
              <h3>Gestión de Servicios</h3>
              <Button onClick={() => handleAction('services')} className="admin-dashboard-button">
                Definir Servicios
              </Button>
            </div>

            <div className="admin-dashboard-section">
              <h3>Gestión de Vales</h3>
              <Button onClick={() => handleAction('tickets')} className="admin-dashboard-button">
                Definir Vales
              </Button>
              <Button onClick={() => handleAction('additional')} className="admin-dashboard-button">
                Generar Vales Adicionales
              </Button>
            </div>

            <div className="admin-dashboard-section">
              <h3>Informes y Auditoría</h3>
              <Button onClick={() => handleAction('reports')} className="admin-dashboard-button">
                Generar Informes
              </Button>
              <Button onClick={() => handleAction('audit')} className="admin-dashboard-button">
                Auditoría de Vales
              </Button>
            </div>

            <div className="admin-dashboard-section">
              <h3>Gestión de Usuarios</h3>
              <Button onClick={() => handleAction('users')} className="admin-dashboard-button">
                Gestion de Usuario
              </Button>
              <Button onClick={() => handleAction('createUser')} className="admin-dashboard-button admin-dashboard-button-primary">
                Generar Perfil de Usuario
              </Button>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer theme="dark" />
    </div>
  );
}
