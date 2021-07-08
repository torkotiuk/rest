const fs = require('fs').promises;
const path = require('path');
const contactsFile = path.basename('C:/rep/rest/contacts.json');

const getAll = async (req, res) => {
  const file = await fs.readFile(contactsFile, 'utf8');
  const contacts = await JSON.parse(file);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
