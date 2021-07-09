const Joi = require('joi');

const itemSchemaAdd = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

const itemSchemaUpdate = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().pattern(/^[0-9]+$/),
});

module.exports = { itemSchemaUpdate, itemSchemaAdd };
