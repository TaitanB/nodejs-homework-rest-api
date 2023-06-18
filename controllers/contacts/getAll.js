const Contact = require("../../models/contacts");
const { ctrlWrapper } = require("../../decorators");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const parameters = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(parameters, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email subscription");

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
