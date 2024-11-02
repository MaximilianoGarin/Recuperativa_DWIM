const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const ticketRoutes = require('./routes/tickets');
const reportRoutes = require('./routes/reports');
const salesRoutes = require('./routes/sales');
const emailRoutes = require('./routes/emails');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tickets', ticketRoutes);
app.use('/reports', reportRoutes);
app.use('/sales', salesRoutes);
app.use('/emails', emailRoutes);

module.exports = app;