import React, { useState } from 'react';
import { DefineService } from '../service/api'; // Asegúrate de implementar esta función en tu API
import '../styles/service.css';

function ServiceDefiner() {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await DefineService({ serviceName, description, price, isAvailable });
      console.log('Servicio creado con éxito:', data);
      setMessage('Servicio definido exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error al definir el servicio. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="service-definer-container">
      <h2>Definir Nuevo Servicio</h2>
      {message && <p className={`message ${message.includes('error') ? 'error' : 'success'}`}>{message}</p>}
      
      <form onSubmit={handleSubmit} className="service-definer-form">
        <div className="form-group">
          <label htmlFor="serviceName">Nombre del Servicio:</label>
          <input
            id="serviceName"
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Ingrese el nombre del servicio"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese una descripción detallada"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Ingrese el precio"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isAvailable">
            Disponible:
            <input
              id="isAvailable"
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
          </label>
        </div>

        <button type="submit" className="submit-button">Definir Servicio</button>
      </form>
    </div>
  );
}

export default ServiceDefiner;