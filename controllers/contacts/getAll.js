// const fs = require('fs').promises;
// const { contactsFile } = require('../../model');
const { Contact } = require('../../model');

const getAll = async (req, res) => {
  // const file = await fs.readFile(contactsFile, 'utf8');
  // const contacts = await JSON.parse(file);
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

  // res.json({
  //   status: 'success',
  //   code: 200,
  //   data: {
  //     result: contacts,
  //   },
  // });
};

module.exports = getAll;
