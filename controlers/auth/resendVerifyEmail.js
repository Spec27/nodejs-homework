const { RequestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження реестрації на сайті",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken} target = "_blank">Підвердіть ваш Email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
