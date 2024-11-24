import React, { useState } from 'react';
import { DefineTicket } from '../service/api'; // Asegúrate de tener esta función en tu servicio API
import '../styles/TicketDefiner.css';  // Importa el archivo CSS aquí

function TicketDefiner() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('open');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await DefineTicket({ title, priority, dueDate, status });
      console.log('Ticket creado con éxito:', data);
      setMessage('Ticket definido exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Ocurrió un error al definir el ticket. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="ticket-definer-container">
      <h2>Definir Nuevo Ticket</h2>
      <form onSubmit={handleSubmit}>
        {message && <p className={`message ${message.includes('Error') ? 'error' : ''}`}>{message}</p>}

        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Prioridad:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de Vencimiento:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Estado:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="open">Abierto</option>
            <option value="in_progress">En Progreso</option>
            <option value="closed">Cerrado</option>
          </select>
        </div>

        <button type="submit">Definir Ticket</button>
      </form>
    </div>
  );
}

export default TicketDefiner;
