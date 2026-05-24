import express from "express";
import getChatGroups from "../controllers/getChatGroups.controller.js";

const getChatGroupsRouter = express.Router();

getChatGroupsRouter.get("/chat-groups", getChatGroups);

export default getChatGroupsRouter;
