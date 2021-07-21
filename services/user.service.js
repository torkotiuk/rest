const { User } = require('../model');

const checkIfUserExistInDb = filter => {
  return User.findOne(filter);
};

const add = ({ email, password }) => {
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  return User.create({ email, password: hashPassword });
};

module.exports = {
  checkIfUserExistInDb,
  add,
};
