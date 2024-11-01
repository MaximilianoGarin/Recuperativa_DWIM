const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/recuperativa_dwim', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo con la URL http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});