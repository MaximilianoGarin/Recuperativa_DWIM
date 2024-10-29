const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://MaxiGarin21:Maxi67924@proyectodw.gip16.mongodb.net/",{useNewUrlParser: true, useUnifiedTopology: true});
// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Food Ticket System API' });
});

// TODO: Add your routes here
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/tickets', require('./routes/tickets'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;