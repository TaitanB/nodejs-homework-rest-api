const Contact = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { email, phone } = req.body;

  const contactEmail = await Contact.findOne({ email });
  const contactPhone = await Contact.findOne({ phone });

  if (contactEmail) {
    throw HttpError(409, "This email already exists in the contacts");
  } else if (contactPhone) {
    throw HttpError(409, "This phone already exists in the contacts");
  }

  const result = await Contact.create({ ...req.body, owner });
  const response = result.toObject();
  delete response.createdAt;
  delete response.updatedAt;

  res.status(201).json(response);
};

module.exports = {
  add: ctrlWrapper(add),
};
