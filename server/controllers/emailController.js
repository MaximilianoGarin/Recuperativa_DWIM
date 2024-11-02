const nodemailer = require('nodemailer');
const User = require('../models/user');
const Ticket = require('../models/ticket');

exports.sendWeeklyReport = async (req, res) => {
    try {
        const users = await User.find();
        const tickets = await Ticket.find();

        const report = tickets.reduce((acc, ticket) => {
            acc[ticket.userId] = (acc[ticket.userId] || 0) + ticket.quantity;
            return acc;
        }, {});

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        for (const user of users) {
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: user.email,
                subject: 'Informe semanal de vales',
                text: `Hola ${user.name},\n\nAquí tienes tu informe semanal de vales:\n\nVales disponibles: ${report[user._id] || 0}\nVales utilizados: ${report[user._id] || 0}\nVales no utilizados: ${report[user._id] || 0}\n\nSaludos,\nEquipo de Libros Impresos S.A.`,
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ message: 'Informes enviados exitosamente' });
    } catch (error) {
        console.error('Error al enviar los informes:', error);
        res.status(500).json({ error: 'Error al enviar los informes' });
    }
};