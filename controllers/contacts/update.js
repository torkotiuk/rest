const fs = require('fs').promises;
const { contactsFile } = require('../../model');
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

  const { contactId } = req.params;

  const file = await fs.readFile(contactsFile, 'utf8');
  const contacts = await JSON.parse(file);

  const index = await contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
    return;
  }

  const currentItem = contacts[index];
  contacts[index] = { ...currentItem, ...req.body, id: contactId };

  await fs.writeFile(contactsFile, JSON.stringify(contacts), 'utf8', error => {
    if (error) {
      console.log(error);
    }
  });

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index],
    },
  });
};

module.exports = update;
