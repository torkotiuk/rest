const { Contact } = require('../../model')

const updateFavorite = async (req, res) => {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      { ...req.body },
      { new: true },
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
}

module.exports = updateFavorite
