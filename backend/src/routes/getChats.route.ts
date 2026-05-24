import express from "express";
import getChats from "../controllers/getChats.controller.js";

const getChatsRouter = express.Router();

getChatsRouter.get("/chats", getChats);

export default getChatsRouter;
