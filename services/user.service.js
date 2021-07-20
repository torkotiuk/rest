const { User } = require('../model');

const checkIfUserExistInDb = filter => {
  return User.findOne(filter);
};

const add = ({ email, password }) => {
  return User.create({ email, password });
};

module.exports = {
  checkIfUserExistInDb,
  add,
};
