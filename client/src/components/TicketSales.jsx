import React, { useState } from 'react';
import { sellTicket } from '../service/api';

function TicketSales({ userId }) { // Asegúrate de pasar el userId como prop
  const [ticketType, setTicketType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await sellTicket({ ticketType, quantity, userId });

      console.log('Ticket sale successful:', data);
      setMessage('Ticket vendido exitosamente');
      // Reset form after submission
      setTicketType('');
      setQuantity(1);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="ticket-sales">
      <h2>Venta de Tickets</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ticketType">Tipo de Ticket:</label>
          <select
            id="ticketType"
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
        <div>
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <button type="submit">Vender Tickets</button>
      </form>
    </div>
  );
}

export default TicketSales;