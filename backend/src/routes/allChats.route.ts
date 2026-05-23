import express from "express";
import { prisma } from "../db/prisma.js";

const allChatsRouter = express.Router();

allChatsRouter.get("/c", async (req, res) => {
  const chats = await prisma.chat.findMany({
    select: { name: true, id: true },
  });

  res.json({ chats });
});

export default allChatsRouter;
