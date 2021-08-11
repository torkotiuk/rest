const nodemailer = require('nodemailer');
require('dotenv').config();
const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;
const config = {
  service: 'gmail',
  auth: {
    user: `${NODEMAILER_USER}`,
    pass: `${NODEMAILER_PASS}`,
  },
};
const transporter = nodemailer.createTransport(config);

const sendEmail = async ({ to, subject, text }) => {
  const mail = {
    from: `${NODEMAILER_USER}`,
    to,
    subject,
    text,
  };

  try {
    const answer = await transporter.sendMail(mail);
    return answer;
  } catch (error) {
    throw new Error('Fault from sendEmail');
  }
};

module.exports = sendEmail;
