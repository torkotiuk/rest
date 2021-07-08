const fs = require('fs').promises;
const { v4 } = require('uuid');
const { contactsFile } = require('../../model');
const { itemSchemaAdd } = require('../../utils/validate/schemas/contacts');

const add = async (req, res) => {
  const { error } = itemSchemaAdd.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
    return;
  }

  const file = await fs.readFile(contactsFile, 'utf8');
  const contacts = await JSON.parse(file);
  const newItem = {
    id: v4(),
    ...req.body,
  };
  await contacts.push(newItem);
  await fs.writeFile(contactsFile, JSON.stringify(contacts), 'utf8', error => {
    if (error) {
      console.log(error);
    }
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newItem,
    },
  });
};

module.exports = add;
