const { contactsFile } = require('../../model');

const getById = (req, res) => {
  const { contactId } = req.params;
  const selectedItem = contactsFile.find(item => item.id === contactId);

  if (!selectedItem) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact with this id is not found',
    });
    return;
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectedItem,
    },
  });
};

module.exports = getById;
