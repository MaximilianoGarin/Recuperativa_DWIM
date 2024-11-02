const Sale = require('../models/sale');

exports.registerSale = async (req, res) => {
    const { ticketId, products } = req.body;
    try {
        const sale = new Sale({ ticketId, products });
        await sale.save();
        res.status(201).json({ message: 'Venta registrada exitosamente', sale });
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        res.status(500).json({ error: 'Error al registrar la venta' });
    }
};