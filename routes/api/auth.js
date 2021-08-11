const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const {
  jwttokenmiddleware,
  tempMiddleware,
  resizeAndUploadImageMiddleware,
} = require('../../middleware');

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', jwttokenmiddleware, ctrl.logout);
router.get('/current', jwttokenmiddleware, ctrl.getProfile);
router.get('/verify/:verifyCode', ctrl.userVerify);
router.post('/verify', ctrl.sendEmailAgain);

router.patch(
  '/avatars',
  jwttokenmiddleware,
  tempMiddleware.single('avatar'),
  resizeAndUploadImageMiddleware,
  ctrl.updateAvatarInfo,
);

module.exports = router;
