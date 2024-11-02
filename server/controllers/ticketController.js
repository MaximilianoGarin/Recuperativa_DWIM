const Ticket = require('../models/ticket');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.createTicket = async (req, res) => {
    const { ticketType, quantity, userId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID de usuario no válido' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        let services = [];
        const currentHour = new Date().getHours();
        if (currentHour >= 8 && currentHour < 16) {
            services = ['desayuno', 'almuerzo'];
        } else if (currentHour >= 16 && currentHour < 24) {
            services = ['once', 'cena1'];
        } else {
            services = ['cena2', 'desayuno'];
        }

        const ticket = new Ticket({ ticketType, quantity, userId, services });
        await ticket.save();
        res.status(201).json({ message: 'Ticket vendido exitosamente', ticket });
    } catch (error) {
        console.error('Error al vender ticket:', error);
        res.status(500).json({ error: 'Error al vender ticket' });
    }
};

exports.createAdditionalTicket = async (req, res) => {
    const { ticketType, quantity, userId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID de usuario no válido' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const ticket = new Ticket({ ticketType, quantity, userId });
        await ticket.save();
        res.status(201).json({ message: 'Ticket adicional vendido exitosamente', ticket });
    } catch (error) {
        console.error('Error al vender ticket adicional:', error);
        res.status(500).json({ error: 'Error al vender ticket adicional' });
    }
};