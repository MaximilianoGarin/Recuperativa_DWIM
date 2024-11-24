const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ticketdswmi@gmail.com',
    pass: 'pmad wxyz hfed esha',
  },
});

exports.sendWelcomeEmail = async (email, id_user) => {
  try {
    const info = await transporter.sendMail({
      from: 'ticketdswmi@gmail.com',
      to: email,
      subject: 'Bienvenido a nuestro sistema',
      text: `Hola, gracias por registrarte. Tu ID de usuario es: ${id_user}`,
    });
    console.log('Correo de bienvenida enviado:', info);
  } catch (error) {
    console.error('Error al enviar el correo de bienvenida:', error);
  }
};

exports.sendWeeklyReport = async (req, res) => {
    try {
      const pdfPath = path.join(__dirname, 'path/to/your/report.pdf');
      const info = await transporter.sendMail({
        from: 'ticketdswmi@gmail.com',
        to: 'cr.hachim2@gmail.com',
        subject: 'Informe Semanal',
        text: 'Este es el informe semanal.',
        attachments: [
          {
            filename: 'report.pdf',
            path: pdfPath,
          },
        ],
      });
      res.status(200).json({ message: 'Informe enviado exitosamente', info });
    } catch (error) {
      console.error('Error al enviar los informes:', error);
      res.status(500).json({ error: 'Error al enviar los informes' });
    }
  };