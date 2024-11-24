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
          handleNavigation('/additional-ticket');
          break;
        case 'reports':
          handleNavigation('/send-report');
          break;
        case 'createUser':
          handleNavigation('/user-creation');
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
      <header className="header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <Button onClick={onLogout} className="logout-button">
            Log out
          </Button>
        </div>
      </header>

      <main className="main-content">
        <div className="user-info-section">
          <span>Administrador: <strong>{user?.name}</strong></span>
          <br />
          <span>Rol: <strong>{user?.role}</strong></span>
        </div>

        <div className="admin-controls">
          <h2>Funciones Administrativas</h2>
          {message && <p className="message">{message}</p>}

          <div className="admin-grid">
            <div className="admin-section">
              <h3>Gestión de Servicios</h3>
              <Button onClick={() => handleAction('services')} className="admin-button">
                Definir Servicios
              </Button>
            </div>

            <div className="admin-section">
              <h3>Gestión de Vales</h3>
              <Button onClick={() => handleAction('tickets')} className="admin-button">
                Generar Vales Adicionales
              </Button>
              <Button onClick={() => handleAction('additional')} className="admin-button">
                Definir Vales
              </Button>
            </div>

            <div className="admin-section">
              <h3>Informes y Auditoría</h3>
              <Button onClick={() => handleAction('reports')} className="admin-button">
                Generar Informes
              </Button>
              <Button onClick={() => handleAction('audit')} className="admin-button">
                Auditoría de Vales
              </Button>
            </div>

            <div className="admin-section">
              <h3>Gestión de Usuarios</h3>
              <Button onClick={() => handleAction('users')} className="admin-button">
                Definir Tipos de Usuario
              </Button>
              <Button onClick={() => handleAction('createUser')} className="admin-button primary">
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