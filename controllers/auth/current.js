const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
