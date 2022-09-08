const express = require("express");
const controller = require("../../controlers/auth");

const { controllerWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), controllerWrapper(controller.register));
router.post("/login", validationBody(schemas.loginSchema), controllerWrapper(controller.login));
router.get("/current", authenticate, controllerWrapper(controller.getCurrent));
router.patch("/avatars", authenticate, upload.single("avatar"), controllerWrapper(controller.updateAvatar));
router.get("/logout", authenticate, controllerWrapper(controller.logout));

module.exports = router;
