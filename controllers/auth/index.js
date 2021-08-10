const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getProfile = require('./getProfile');
const updateAvatarInfo = require('./updateAvatarInfo.ctrl');

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateAvatarInfo,
};
