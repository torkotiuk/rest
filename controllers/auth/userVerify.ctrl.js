const { user: service } = require('../../services');

const userVerify = async (req, res, next) => {
  const { verifyCode } = req.params;

  try {
    const user = await service.checkIfUserExistInDb({ verifyCode });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Verify code has been expired..',
      });
    }
    await service.updateById(user._id, { verify: true, verifyCode: '' });
    res.json({
      status: 'success',
      code: 200,
      message: 'Email was verified successfully, thank you.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userVerify;
