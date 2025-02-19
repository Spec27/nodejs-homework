const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
  const mail = {
    to: email,
    subject: "Підтвердження реестрації на сайті",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target = "_blank">Підвердіть ваш Email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = register;
