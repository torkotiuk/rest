const { user: service } = require('../../services');
const path = require('path');
const fs = require('fs/promises');
const avatarDirPath = path.join(process.cwd(), 'public/avatars');

const upload = async (req, res, next) => {
  const { path: tmpPathToFile, originalname } = req.file;

  try {
    const user = await service.checkIfUserExistInDb({
      email: 'admin11@mail.com',
    });
    //
    const oldFileName = tmpPathToFile;
    const newFileName = `${avatarDirPath}/${user._id}.png`;
    fs.rename(oldFileName, newFileName);
    //
    res.json({
      message: `${originalname} was renamed to user._id.* file and moved to public folder`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = upload;
