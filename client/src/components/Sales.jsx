import React, { useState } from 'react';
import { registerSale } from '../service/api';

function Sales() {
  const [ticketId, setTicketId] = useState('');
  const [products, setProducts] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await registerSale({ ticketId, products: products.split(',') });
      console.log('Sale registered successfully:', data);
      setMessage('Venta registrada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="sales-container">
      <h2>Registrar Venta</h2>
      <form onSubmit={handleSubmit}>
        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <label>ID del Ticket:</label>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Productos (separados por comas):</label>
          <input
            type="text"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default Sales;