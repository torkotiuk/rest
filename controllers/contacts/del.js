const { Contact } = require('../../model');

const del = async (req, res) => {
  try {
    await Contact.findOneAndDelete({ _id: req.params.contactId });
    res.status(200).json({
      status: 'No content',
      code: 200,
      message: `Contact with id ${req.params.contactId} was deleted`,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = del;
