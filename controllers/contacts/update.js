const { Contact } = require('../../model');
const { itemSchemaUpdate } = require('../../utils/validate/schemas/contacts');

const update = async (req, res) => {
  const { error } = itemSchemaUpdate.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
    return;
  }

  try {
    const result = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      { ...req.body },
      { new: true },
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = update;
