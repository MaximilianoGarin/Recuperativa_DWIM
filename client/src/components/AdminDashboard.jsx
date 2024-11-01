import React, { useState } from 'react';
import api from '../service/api';

function AdminDashboard({ userId, onLogout }) {
  const [error, setError] = useState('');

  const handleButtonClick = async (action) => {
    setError('');
    try {
      let response;
      switch (action) {
        case 'Definir Servicio':
          // Implement service definition logic
          break;
        case 'Definir Vales':
          // Implement voucher definition logic
          break;
        case 'Definir Tipo de Usuario':
          // Implement user type definition logic
          break;
        case 'Generar Informe':
          // Implement report generation logic
          break;
        case 'Generar Vales Adicionales':
          // Implement additional voucher generation logic
          break;
        case 'Generar Perfiles de Usuario':
          // Implement user profile generation logic
          break;
        default:
          console.log(`Action not implemented: ${action}`);
      }
      console.log(`Action triggered: ${action}`);
      alert(`Acción seleccionada: ${action}`);
    } catch (error) {
      console.error(`Error executing action ${action}:`, error);
      setError('Ocurrió un error al ejecutar la acción. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Panel de Administrador</h2>
      <p>ID de Usuario: {userId}</p>
      {error && <p className="error-message">{error}</p>}
      <div className="admin-buttons">
        <button onClick={() => handleButtonClick('Definir Servicio')}>Definir Servicio</button>
        <button onClick={() => handleButtonClick('Definir Vales')}>Definir Vales</button>
        <button onClick={() => handleButtonClick('Definir Tipo de Usuario')}>Definir Tipo de Usuario</button>
        <button onClick={() => handleButtonClick('Generar Informe')}>Generar Informe, Auditoría de Vales</button>
        <button onClick={() => handleButtonClick('Generar Vales Adicionales')}>Generar Vales Adicionales</button>
        <button onClick={() => handleButtonClick('Generar Perfiles de Usuario')}>Generar Perfiles de Usuario</button>
      </div>
      <button onClick={onLogout} className="logout-btn">Cerrar Sesión</button>
    </div>
  );
}

export default AdminDashboard;