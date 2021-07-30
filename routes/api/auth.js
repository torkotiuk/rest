const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);

module.exports = router;
