const { User } = require('../../model');

const getProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    const currentUser = {
      email: user.email,
      subscription: user.subscription,
    };
    res.status(200).json({
      status: 'success',
      code: 200,
      result: { currentUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
