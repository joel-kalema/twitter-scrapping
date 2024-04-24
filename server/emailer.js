const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendVideoEmail(to, videoUrl) {
  const subject = 'New video post on Twitter';
  const text = `A new post containing a video was found on Twitter: ${videoUrl}`;
  sendEmail(to, subject, text);
}

module.exports = { sendEmail, sendVideoEmail };