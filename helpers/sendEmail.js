const { ReferenceError } = require("../helpers/RequestError");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "serhii.kuvardin@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw ReferenceError();
  }
};

module.exports = sendEmail;
