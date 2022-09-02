const { Contact } = require("../../models/contact");
const { RequestError } = "../../helpers";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt").populate("owner", "email");
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
