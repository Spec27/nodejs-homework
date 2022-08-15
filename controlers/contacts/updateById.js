const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContactId;