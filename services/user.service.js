const bcrypt = require('bcryptjs');
const { User } = require('../model');
const { avatarUrl } = require('../helper');

const checkIfUserExistInDb = filter => {
  return User.findOne(filter);
};

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo);
};

const add = ({ email, password, verifyCode }) => {
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  return User.create({
    email,
    password: hashPassword,
    avatarURL: avatarUrl,
    verifyCode,
  });
};

module.exports = {
  checkIfUserExistInDb,
  add,
  updateById,
};
