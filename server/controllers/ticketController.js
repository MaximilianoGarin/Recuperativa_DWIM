const Ticket = require('../models/ticket');
const mongoose = require('mongoose');

exports.createTicket = async (req, res) => {
    const { ticketType, quantity, userId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID de usuario no válido' });
        }
        const ticket = new Ticket({ ticketType, quantity, userId });
        await ticket.save();
        res.status(201).json({ message: 'Ticket vendido exitosamente', ticket });
    } catch (error) {
        console.error('Error al vender ticket:', error);
        res.status(500).json({ error: 'Error al vender ticket' });
    }
};