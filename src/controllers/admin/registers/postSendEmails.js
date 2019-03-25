const mailer = require('nodemailer');

exports.postSendEmails = (request, response) => {
  if (request.token) {
    response.render();
  } else {
    const { to, subject, message } = request.body;
    const { EMAIL, PASS } = process.env;
    const transportar = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });
    const mailOpation = {
      from: `"Enhance A Smile" <${EMAIL}>`,
      bcc: to,
      subject,
      text: message,
      html: `<B style='color: white;background: black;'>${message}</B>`,
    };
    transportar
      .sendMail(mailOpation)
      .then(() => {
        response.status(200).send({ msg: 'done' });
      })
      .catch(() => {
        response.status(500).send({ msg: 'server error' });
      });
  }
};
