// const nanoid = require('nanoid');
const { v4 } = require('uuid');
const { sendEmail } = require('../../helper');
const { user: service } = require('../../services');
const {
  userSchemaJoi,
} = require('../../utils/validate/schemas/users.schema.joi');

const register = async (req, res, next) => {
  const { email } = req.body;
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
    const result = await service.checkIfUserExistInDb({ email });
    if (result) {
      res.status(409).json({
        status: 'Conflict',
        code: 409,
        message: 'The email address is already in use',
      });
      return;
    }

    const verifyCode = v4();
    await service.add({
      email,
      password: req.body.password,
      verifyCode,
    });

    const mail = {
      to: email,
      subject: 'Verify your email',
      text: `Press next link http://localhost:3001/api/users/verify/${verifyCode} to verify your ${email}`,
    };
    await sendEmail(mail);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'User has been added successfully. Verify email.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
