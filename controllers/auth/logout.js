const { User } = require('../../model');

const logout = async (req, res) => {
  const user = req.user;
  try {
    await User.findOneAndUpdate({ _id: user.id }, { token: null });
    res.status(200).json({
      message: 'Logout successfully',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = logout;
