const { v4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const contactsFile = path.basename('C:/rep/rest/contacts.json');
const itemSchema = require('../../utils/validate/schemas/contacts');

const add = async (req, res) => {
  const file = await fs.readFile(contactsFile, 'utf8');
  const contacts = await JSON.parse(file);

  // --- === -- validation -- === --- //
  const { error } = itemSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
    return;
  }
  // --- ===  --- === --- === --- //
  const newItem = {
    id: v4(),
    ...req.body,
  };
  await contacts.push(newItem);
  // --- ===
  await fs.writeFile(contactsFile, JSON.stringify(contacts), 'utf8', error => {
    if (error) {
      console.log(error);
    }
  });
  // --- ===

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newItem,
    },
  });
};

module.exports = add;
