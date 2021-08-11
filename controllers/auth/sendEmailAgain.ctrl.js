const { user: service } = require('../../services');

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
