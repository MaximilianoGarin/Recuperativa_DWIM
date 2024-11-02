const User = require('../models/user');

exports.verifyRole = (roles) => {
    return async (req, res, next) => {
        const { id_user } = req.body;
        try {
            const user = await User.findOne({ id_user });
            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ error: 'Acceso denegado' });
            }
            next();
        } catch (error) {
            console.error('Error al verificar el rol:', error);
            res.status(500).json({ error: 'Error al verificar el rol' });
        }
    };
};