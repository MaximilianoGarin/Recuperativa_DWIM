import React, { useState, useEffect } from 'react';
import { sendWeeklyReport, getTickets } from '../service/api'; // Aseguramos que la función getTickets y sendWeeklyReport existan

function SendReport() {
  const [message, setMessage] = useState('');
  const [ticketsData, setTicketsData] = useState([]);
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    // Obtener los tickets cuando el componente se monta
    const fetchTickets = async () => {
      try {
        const data = await getTickets();  // Llamada para obtener los tickets
        setTicketsData(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Función para generar el informe de los tickets
  const generateTicketReport = () => {
    if (ticketsData.length === 0) return 'No hay tickets disponibles para generar el informe.';

    // Crear un informe simple basado en los tickets
    const report = ticketsData.map(ticket => {
      return `
        Ticket ID: ${ticket.id}
        Tipo: ${ticket.type}
        Precio: ${ticket.price}
        Fecha de venta: ${ticket.soldDate}
      `;
    }).join('\n'); // Unir todos los detalles en un string de texto

    setReportContent(report);  // Actualizar el contenido del informe
  };

  const handleSendReport = async () => {
    setMessage('');
    
    if (!reportContent) {
      setMessage('Por favor, genera un informe antes de enviarlo.');
      return;
    }

    try {
      // Enviar el informe generado
      const response = await sendWeeklyReport({ reportContent });
      console.log('Informe semanal enviado exitosamente:', response);
      setMessage('Informe semanal enviado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error al enviar el informe. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="send-report-container">
      <h2>Enviar Informe Semanal</h2>

      {/* Mostrar los botones para generar y enviar el informe */}
      <button onClick={generateTicketReport}>Generar Informe</button>
      <button onClick={handleSendReport}>Enviar Informe</button>

      {message && <p className="message">{message}</p>}

      {/* Mostrar la vista previa del informe generado */}
      {reportContent && (
        <div className="report-preview">
          <h3>Vista previa del informe:</h3>
          <pre>{reportContent}</pre>
        </div>
      )}
    </div>
  );
}

export default SendReport;
