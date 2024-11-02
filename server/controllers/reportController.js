const Ticket = require('../models/ticket');

exports.generateReport = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        const report = tickets.reduce((acc, ticket) => {
            acc[ticket.ticketType] = (acc[ticket.ticketType] || 0) + ticket.quantity;
            return acc;
        }, {});
        res.status(200).json({ report });
    } catch (error) {
        console.error('Error al generar el informe:', error);
        res.status(500).json({ error: 'Error al generar el informe' });
    }
};