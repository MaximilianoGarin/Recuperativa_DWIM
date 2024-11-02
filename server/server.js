const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000; // Cambia el puerto aquí

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/recuperativa_dwim', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a la base de datos MongoDB en mongodb://localhost:27017/recuperativa_dwim');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error al conectar a la base de datos MongoDB en mongodb://localhost:27017/recuperativa_dwim:', error.message);
    process.exit(1); // Salir del proceso con error
});