const express = require("express");
const controller = require("../../controlers/contacts");
const { controllerWrapper } = require("../../helpers");
const { authenticate, validationBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.getAll));

router.get("/:contactId", authenticate, isValidId, controllerWrapper(controller.getById));

router.post("/", authenticate, validationBody(schemas.addSchema), controllerWrapper(controller.add));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationBody(schemas.addSchema),
  controllerWrapper(controller.updateContactId)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact)
);

router.delete("/:contactId", authenticate, isValidId, controllerWrapper(controller.deleteContact));

module.exports = router;
