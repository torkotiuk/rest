const Joi = require('joi');
const itemSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
});
module.exports = itemSchema;
