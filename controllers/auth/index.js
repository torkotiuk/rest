const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getProfile = require('./getProfile');
const upload = require('./upload.ctrl');

module.exports = {
  register,
  login,
  logout,
  getProfile,
  upload,
};
