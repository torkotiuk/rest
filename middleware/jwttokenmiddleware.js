const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

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
    req.user = user;
    //
    next();
  } catch (error) {
    res.status(401).json({
      status: 'Bad request',
      code: 401,
      message: 'Not authorized',
    });
  }
};

module.exports = jwttokenmiddleware;
