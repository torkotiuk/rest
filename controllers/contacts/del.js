const fs = require('fs').promises;
const { contactsFile } = require('../../model');

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
    message: 'Item was deleted successfully/No content',
  });
};

module.exports = del;
