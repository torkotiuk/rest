const { user: service } = require('../../services');
const {
  userSchemaJoi,
} = require('../../utils/validate/schemas/users.schema.joi');

const register = async (req, res, next) => {
  const { error } = userSchemaJoi.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: `users.schema.joi checking error: ${error.details[0].message}`,
    });
    return;
  }

  try {
    const result = await service.checkIfUserExistInDb({
      email: req.body.email,
    });
    if (result) {
      res.status(409).json({
        status: 'Conflict',
        code: 409,
        message: 'The email address is already in use',
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
