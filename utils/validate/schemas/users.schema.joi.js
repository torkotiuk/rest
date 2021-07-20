const Joi = require('joi');

const userSchemaJoi = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().min(6),
});

module.exports = { userSchemaJoi };
