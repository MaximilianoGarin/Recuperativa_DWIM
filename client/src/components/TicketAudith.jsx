import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/audit.css';

function TicketAudith() {
  const [ticketCount, setTicketCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener el número de tickets
    const fetchTicketCount = async () => {
      try {
        const response = await fetch('/api/tickets/count');
        if (!response.ok) {
          throw new Error('No se pudo obtener la cantidad de tickets');
        }
        const data = await response.json();
        setTicketCount(data.count);
      } catch (error) {
        setError(error.message);
        toast.error('Hubo un error al obtener la cantidad de tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketCount();
  }, []);

  return (
    <div className="ticket-audit-container">
      <h2>Auditoría de Tickets</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="ticket-count">
          <h3>Total de Tickets Generados:</h3>
          <p>{ticketCount}</p>
        </div>
      )}

      <ToastContainer theme="dark" />
    </div>
  );
}

export default TicketAudith;