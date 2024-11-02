import React, { useState } from 'react';
import { sellTicket } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';

export default function TicketSales({ user, onLogout }) {
  const [ticketType, setTicketType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await sellTicket({ ticketType, quantity, userId: user.id_user });
      console.log('Ticket sale successful:', data);
      setMessage('Ticket vendido exitosamente');
      toast.success('Se generó el vale');
      setTicketType('');
      setQuantity(1);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error. Por favor, intente nuevamente.');
      toast.error('Error al generar el vale');
    }
  };

  return (
    <div className="ticket-sales-container">
      <header className="header">
        <div className="header-content">
          <h1>Empresa X</h1>
          <Button onClick={onLogout} className="logout-button">
            Log out
          </Button>
        </div>
      </header>

      <main className="main-content">
        <div className="user-info-section">
          <span>Usuario: {user.name}</span>
          <br />
          <span>Turno: {}</span>
        </div>

        <div className="ticket-form-container">
          <h2>Venta de Tickets</h2>
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

            <div className="button-group">
              <Button type="submit">Vender Tickets</Button>
              <Button type="button">Pedir Varios</Button>
              <Button type="button">Imprimir</Button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer theme="dark" />
    </div>
  );
}