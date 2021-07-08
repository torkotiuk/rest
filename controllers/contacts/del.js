// const products = require('../../model/contacts.json');
const fs = require('fs').promises;
const path = require('path');
const contactsFile = path.basename('C:/rep/rest/contacts.json');

const del = async (req, res) => {
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

  // products.splice(index, 1);
  const newContacts = await contacts.filter(item => item.id !== contactId);
  await fs.writeFile(
    contactsFile,
    JSON.stringify(newContacts),
    'utf8',
    error => {
      if (error) {
        console.log(error);
      }
    },
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Content was deleted successfully/No content',
  });
};

module.exports = del;
