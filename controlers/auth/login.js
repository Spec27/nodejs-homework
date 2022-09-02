const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};
module.exports = login;
