require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

// Conexión a MongoDB usando la URI de .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Configuración adicional de tu servidor
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
