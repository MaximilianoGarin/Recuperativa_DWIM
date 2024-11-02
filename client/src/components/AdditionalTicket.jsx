import React, { useState } from 'react';
import { createAdditionalTicket } from '../service/api';

function AdditionalTicket() {
  const [ticketType, setTicketType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await createAdditionalTicket({ ticketType, quantity, userId });
      console.log('Additional ticket sale successful:', data);
      setMessage('Ticket adicional vendido exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="additional-ticket-container">
      <h2>Generar Ticket Adicional</h2>
      <form onSubmit={handleSubmit}>
        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <label>Tipo de Ticket:</label>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="general">General</option>
            <option value="vip">VIP</option>
            <option value="estudiante">Estudiante</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>ID de Usuario:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <button type="submit">Generar Ticket Adicional</button>
      </form>
    </div>
  );
}

export default AdditionalTicket;