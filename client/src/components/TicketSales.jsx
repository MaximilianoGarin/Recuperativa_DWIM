import React, { useState } from 'react';
import { sellTicket } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import jsPDF from 'jspdf';

export default function TicketSales({ user, onLogout }) {
  const [ticketType, setTicketType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [ticketInfo, setTicketInfo] = useState(null);

  const getTurno = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 8 && currentHour < 16) {
      return 'Turno 1 (desayuno + almuerzo)';
    } else if (currentHour >= 16 && currentHour < 24) {
      return 'Turno 2 (once + cena1)';
    } else {
      return 'Turno 3 (cena2 + desayuno)';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await sellTicket({ ticketType, quantity, userId: user._id });
      console.log('Ticket sale successful:', data);
      setMessage('Ticket vendido exitosamente');
      toast.success('Se generó el vale');
      setTicketType('');
      setQuantity(1);
      setTicketInfo({
        userId: user._id,
        turno: getTurno(),
        ticketType,
        quantity,
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error. Por favor, intente nuevamente.');
      toast.error('Error al generar el vale');
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text(`Usuario: ${user.name}`, 10, 10);
    doc.text(`ID de Usuario: ${user._id}`, 10, 20);
    doc.text(`Turno: ${getTurno()}`, 10, 30);
    doc.text(`Tipo de Ticket: ${ticketType}`, 10, 40);
    doc.text(`Cantidad: ${quantity}`, 10, 50);
    doc.save('ticket.pdf');
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
          <span>Rol: {user.role}</span>
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
                <option value="general">Externo</option>
                <option value="vip">Interno</option>
                <option value="estudiante">Turno 3</option>
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
              <Button type="submit">Vender Tickets Adicional</Button>
              <Button type="button" onClick={handlePrint}>Imprimir Vale</Button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer theme="dark" />
      {ticketInfo && (
        <div className="ticket-info-modal">
          <h2>Información del Ticket</h2>
          <p>ID de Usuario: {ticketInfo.userId}</p>
          <p>Turno: {ticketInfo.turno}</p>
          <p>Tipo de Ticket: {ticketInfo.ticketType}</p>
          <p>Cantidad: {ticketInfo.quantity}</p>
          <Button onClick={() => setTicketInfo(null)}>Cerrar</Button>
        </div>
      )}
    </div>
  );
}