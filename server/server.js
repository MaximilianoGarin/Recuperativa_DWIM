// /server/server.js

const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/recuperativa_dwim';

// Conectar a la base de datos
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
