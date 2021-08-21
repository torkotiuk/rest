const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_KEY, SG_SENDER } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

const sendSgMail = async ({ to, subject, text, html }) => {
  const mail = {
    from: SG_SENDER,
    to,
    subject,
    text,
    html,
  };
  try {
    const answer = await sgMail.send(mail);
    return answer;
  } catch (error) {
    throw new Error(error.message);
  }
};

// sgMail
//   .send(mail)
//   .then(() => console.log('Email sent successfully'))
//   .catch(err => console.log(err));

module.exports = sendSgMail;
