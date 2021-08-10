const multer = require('multer');
const path = require('path');
const tempDirPath = path.join(process.cwd(), 'temp');
const storageSettings = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const tempMiddleware = multer({ storage: storageSettings });

module.exports = tempMiddleware;
