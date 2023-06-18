const Contact = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
