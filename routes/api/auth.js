const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const jwttokenmiddleware = require('../../middleware/jwttokenmiddleware');

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', jwttokenmiddleware, ctrl.logout);
router.get('/current', jwttokenmiddleware, ctrl.getProfile);

module.exports = router;
