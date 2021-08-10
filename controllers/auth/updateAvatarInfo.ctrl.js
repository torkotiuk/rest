const { User } = require('../../model');

const updateAvatarInfo = async (req, res, next) => {
  const { originalname } = req.file;
  try {
    const avatarUrlOnTheSite = `http://localhost:3001/public/avatars/${req.user.id}.png`;

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { avatarURL: avatarUrlOnTheSite },
      { new: true },
    );

    // const oldFileName = tmpPathToFile;
    // const newFileName = `${avatarDirPath}/${user._id}.png`;
    // fs.rename(oldFileName, newFileName);

    res.status(200).json({
      data: {
        email: user.email,
        avatarURL: avatarUrlOnTheSite,
      },
      message: `${originalname} was renamed to user._id.* file and moved to avatars folder`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatarInfo;
