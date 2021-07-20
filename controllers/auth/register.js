const { user: service } = require('../../services');

const register = async (req, res, next) => {
  try {
    const result = await service.checkIfUserExistInDb({
      email: req.body.email,
    });
    if (result) {
      res.status(409).json({
        status: 'fail',
        code: 409,
        message: 'User is already exists',
      });
      return;
    }

    await service.add({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'User has been added successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
