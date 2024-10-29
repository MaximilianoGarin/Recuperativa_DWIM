// /server/controllers/authController.js

exports.login = (req, res) => {
    const { username, password } = req.body;
    // Aquí iría la lógica de autenticación
    res.json({ message: 'Autenticación exitosa' });
};