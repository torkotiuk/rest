const fs = require('fs').promises;
const path = require('path');
const contactsFile = path.basename('C:/rep/rest/contacts.json');

const update = async (req, res) => {
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
  // why here contacts are old????
  const currentItem = contacts[index];
  contacts[index] = { ...currentItem, ...req.body, id: contactId };
  // why here contacts become new????
  // ===
  await fs.writeFile(contactsFile, JSON.stringify(contacts), 'utf8', error => {
    if (error) {
      console.log(error);
    }
  });
  // ===
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index],
    },
  });
};

module.exports = update;
