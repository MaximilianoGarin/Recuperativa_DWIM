const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;