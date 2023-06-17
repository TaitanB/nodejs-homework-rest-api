const express = require("express");

const {
  register,
  login,
  logout,
  current,
  updateSubscription,
} = require("../../controllers/auth");

const {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
} = require("../../schemas/users");

const { validateBody } = require("../../decorators");
const { unauthorized } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.post("/logout", unauthorized, logout);

router.get("/current", unauthorized, current);

router.patch(
  "/",
  unauthorized,
  validateBody(userSubscriptionSchema),
  updateSubscription
);

module.exports = router;
