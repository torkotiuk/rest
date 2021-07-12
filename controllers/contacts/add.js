const { Contact } = require('../../model');
const { itemSchemaAdd } = require('../../utils/validate/schemas/contacts');

const add = async (req, res) => {
  const { error } = itemSchemaAdd.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `JOI schema checking error: ${error.details[0].message}. 
      Please fill the number in formats (123) 456-7890 or 123-456-7890`,
    });
    return;
  }

  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = add;
