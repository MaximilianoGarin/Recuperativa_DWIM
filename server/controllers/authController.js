const User = require('../models/user');

// Función para generar un ID de usuario aleatorio de 3 dígitos
const generateUserId = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};

// Registro de usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const id_user = generateUserId();
    try {
        const user = new User({ id_user, name, email, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente', id_user });
    } catch (error) {
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
        res.json({ message: 'Autenticación exitosa', user });
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ error: 'Error en la autenticación' });
    }
};