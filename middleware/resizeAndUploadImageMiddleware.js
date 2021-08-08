const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');

const resizeImageMiddleware = (req, res, next) => {
  const { path: tmpPathToFile } = req.file;
  try {
    Jimp.read(req.file.path)
      .then(image => {
        image.resize(250, 250);
        image.write(tmpPathToFile);

        const avatarDirPath = path.join(process.cwd(), 'public/avatars');
        const oldFileName = tmpPathToFile;
        const newFileName = `${avatarDirPath}/${req.user.id}.png`;
        fs.rename(oldFileName, newFileName);
      })
      .catch(err => {
        console.log(err.message);
      });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resizeImageMiddleware;
