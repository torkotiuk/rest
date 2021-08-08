const gravatar = require('gravatar');

const avatarUrl = gravatar.url('emerleite@gmail.com', {
  s: '200',
  r: 'pg',
  d: '404',
});

module.exports = avatarUrl;
