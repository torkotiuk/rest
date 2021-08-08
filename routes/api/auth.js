const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const jwttokenmiddleware = require('../../middleware/jwttokenmiddleware');

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', jwttokenmiddleware, ctrl.logout);
router.get('/current', jwttokenmiddleware, ctrl.getProfile);

const multer = require('multer');
const path = require('path');
// const tempDir = path.join(__dirname, 'temp');
// or
const tempDirPath = path.join(process.cwd(), 'temp');
const storageSettings = multer.diskStorage({
  // req - request from express
  // file - file info
  // cb - callback for going to the next step
  destination: (req, file, cb) => {
    cb(null, tempDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const tempMiddleware = multer({ storage: storageSettings });
router.patch('/avatars', tempMiddleware.single('avatar'), ctrl.upload);

module.exports = router;
