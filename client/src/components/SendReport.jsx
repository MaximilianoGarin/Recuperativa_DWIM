import React, { useState } from 'react';
import { sendWeeklyReport } from '../service/api';

function SendReport() {
  const [message, setMessage] = useState('');

  const handleSendReport = async () => {
    setMessage('');

    try {
      const data = await sendWeeklyReport();
      console.log('Weekly report sent successfully:', data);
      setMessage('Informe semanal enviado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="send-report-container">
      <h2>Enviar Informe Semanal</h2>
      {message && <p className="message">{message}</p>}
      <button onClick={handleSendReport}>Enviar Informe</button>
    </div>
  );
}

export default SendReport;