const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;
const User = require('../middleware');

const jwttokenmiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'Bad request',
      code: 401,
      message: 'Not authorized',
    });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    // we need id for logout
    const user = jwt.decode(token);
    // console.log(user);

    // const existingUser = await User.findOne({ token: user.token });
    // console.log(existingUser);
    // if (!existingUser.token) {
    //   return res.status(401).json({
    //     status: 'Bad request',
    //     code: 401,
    //     message: 'Not authorized',
    //   });
    // }

    req.user = user;

    //
    next();
  } catch (error) {
    res.status(401).json({
      status: 'Bad request',
      code: 401,
      message: 'Not authorized (Catch error in middleware)',
    });
  }
};

module.exports = jwttokenmiddleware;
