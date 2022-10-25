const ApiError = require('../error/ApiError');
const nodemailer = require('nodemailer');

class emailController {
  async send(req, res, next) {
    try {
      let { name, phone, file, question } = req.body;

      let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'woodmaster_server@mail.ru',
          pass: 'F2LdZdxV8ScKgQaSL9dy',
        },
      });

      await transporter.sendMail({
        from: 'WoodMaster <woodmaster_server@mail.ru>',
        to: 'woodmaster73@bk.ru',
        subject: 'Запрос от сайта WoodMaster73',
        html: question
          ? `<h2>Поступил запрос на обратный звонок!</h2>
        <h3>Контактные данные:</h3>
        <ul>
            <li><strong>Номер телефона:</strong> <a href="tel:${phone}">${phone}</a></li>
            <li><strong>Имя:</strong> ${name}</li>
            <li><strong>Вопрос:</strong> ${question}</li>
        </ul>`
          : `<h2>Поступил запрос на обратный звонок!</h2>
        <h3>Контактные данные:</h3>
        <ul>
            <li><strong>Номер телефона:</strong> <a href="tel:${phone}">${phone}</a></li>
            <li><strong>Имя:</strong> ${name}</li>
        </ul>`,
      });

      return res.send({ message: 'Отправилось' });
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
}

module.exports = new emailController();
