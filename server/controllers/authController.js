const User = require('../models/user');
const { sendWelcomeEmail } = require('./emailController'); // Importar la función para enviar el correo

// Función para generar un ID de usuario aleatorio de 3 dígitos
const generateUserId = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};

// Registro de usuario
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const id_user = generateUserId();
    try {
        const user = new User({ id_user, name, email, password, role });
        await user.save();
        
        // Enviar correo de bienvenida
        await sendWelcomeEmail(email, id_user);

        res.status(201).json({ message: 'Usuario registrado exitosamente', id_user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Autenticación de usuario
exports.login = async (req, res) => {
    const { id_user, password } = req.body;
    try {
        const user = await User.findOne({ id_user });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        res.json({ message: 'Autenticación exitosa', user: { id_user: user.id_user, name: user.name, role: user.role } });
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ error: 'Error en la autenticación' });
    }
};