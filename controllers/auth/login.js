const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { user: service } = require('../../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const candidate = await service.checkIfUserExistInDb({
      email: req.body.email,
    });
    if (!candidate) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'Check your credentials for correct authorization...',
      });
      return;
    }
    //
    const isPasswordCorrect = bcrypt.compareSync(password, candidate.password);
    if (!isPasswordCorrect) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'Check your credentials for correct authorization...',
      });
      return;
    }
    //
    const payload = {
      email,
      id: candidate._id,
    };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({
      token,
      user: {
        email: candidate.email,
        subscription: candidate.subscription,
      },
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = login;
