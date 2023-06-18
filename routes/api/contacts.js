const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");

const { isValidId, unauthorized } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const { addSchema, updateStatusSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", unauthorized, getAll);

router.get("/:contactId", unauthorized, isValidId, getById);

router.post("/", unauthorized, validateBody(addSchema), add);

router.put(
  "/:contactId",
  unauthorized,
  isValidId,
  validateBody(addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  unauthorized,
  isValidId,
  validateBody(updateStatusSchema),
  updateStatusContact
);

router.delete("/:contactId", unauthorized, isValidId, deleteById);

module.exports = router;
