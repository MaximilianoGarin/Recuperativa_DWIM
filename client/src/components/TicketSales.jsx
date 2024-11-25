import React, { useState } from 'react';
import { sellTicket } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/service.css';
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
    <div className="service-definer-container">
      <header>
        <h1 style={{ textAlign: 'center', color: '#4e54c8' }}>Empresa X</h1>
        <button onClick={onLogout} className="submit-button" style={{ float: 'right' }}>
          Log out
        </button>
      </header>

      <main>
        <div>
          <p><strong>Usuario:</strong> {user.name}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>

        <div>
          <h2>Venta de Tickets</h2>
          <form className="service-definer-form" onSubmit={handleSubmit}>
            {message && (
              <p
                className={`message ${
                  message.toLowerCase().includes('error') ? 'error' : 'success'
                }`}
              >
                {message}
              </p>
            )}

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

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button type="submit" className="submit-button">
                Vender Tickets
              </button>
              <button type="button" onClick={handlePrint} className="submit-button">
                Imprimir Vale
              </button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer theme="dark" />
      {ticketInfo && (
        <div>
          <h2>Información del Ticket</h2>
          <p><strong>ID de Usuario:</strong> {ticketInfo.userId}</p>
          <p><strong>Turno:</strong> {ticketInfo.turno}</p>
          <p><strong>Tipo de Ticket:</strong> {ticketInfo.ticketType}</p>
          <p><strong>Cantidad:</strong> {ticketInfo.quantity}</p>
          <button onClick={() => setTicketInfo(null)} className="submit-button">
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
