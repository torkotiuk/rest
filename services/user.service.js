const bcrypt = require('bcryptjs');
const { User } = require('../model');
const { avatarUrl } = require('../helper');

const checkIfUserExistInDb = filter => {
  return User.findOne(filter);
};

const add = ({ email, password }) => {
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  return User.create({ email, password: hashPassword, avatarURL: avatarUrl });
};

module.exports = {
  checkIfUserExistInDb,
  add,
};
