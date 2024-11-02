const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    products: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;