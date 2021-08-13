const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getProfile = require('./getProfile');
const updateAvatarInfo = require('./updateAvatarInfo.ctrl');
const userVerify = require('./userVerify.ctrl');
const sendEmailAgain = require('./sendEmailAgain.ctrl');

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateAvatarInfo,
  userVerify,
  sendEmailAgain,
};
