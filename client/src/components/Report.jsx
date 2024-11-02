import React, { useState, useEffect } from 'react';
import { generateReport } from '../service/api';

function Report() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await generateReport();
        setReport(data.report);
      } catch (error) {
        console.error('Error al generar el informe:', error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="report-container">
      <h2>Informe de Vales</h2>
      {report ? (
        <ul>
          {Object.entries(report).map(([ticketType, quantity]) => (
            <li key={ticketType}>
              {ticketType}: {quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando informe...</p>
      )}
    </div>
  );
}

export default Report;