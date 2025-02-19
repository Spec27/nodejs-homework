const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: "" });
  res.status(200).json({ message: "No Content" });
};

module.exports = logout;
