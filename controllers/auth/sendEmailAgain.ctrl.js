const { user: service } = require('../../services');
const { sendSgMail } = require('../../helper');

const sendEmailAgain = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required field email',
      });
      return;
    }

    const user = await service.checkIfUserExistInDb({ email });
    if (user?.verify === true) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has been passed already ',
      });
      return;
    }

    if (user?.verify === false) {
      const mail = {
        to: email,
        subject: 'Verify your email',
        text: `Press next link http://localhost:3001/api/users/verify/${user.verifyCode} to verify your ${email}`,
        html: `<p> press http://localhost:3001/api/users/verify/${user.verifyCode} to verify your ${email} </p>`,
      };
      await sendSgMail(mail);

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Email has been send again successfully',
      });

      return;
    }
  } catch (error) {
    next(error);
  }
  res.json({ message: `sendEmailAgain, email getting ${email}` });
};

module.exports = sendEmailAgain;
