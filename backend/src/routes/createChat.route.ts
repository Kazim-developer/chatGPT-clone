import express from "express";
import createChat from "../controllers/createChat.controller.js";
import validateSchema from "../util/validateSchema.util.js";
import createChatSchema from "../validator/createChat.validator.js";

const createChatRouter = express.Router();

createChatRouter.post(
  "/chat/create",
  validateSchema(createChatSchema),
  createChat,
);

export default createChatRouter;
