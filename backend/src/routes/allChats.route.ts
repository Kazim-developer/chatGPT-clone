import express from "express";
import { prisma } from "../db/prisma.js";

const allChatsRouter = express.Router();

allChatsRouter.get("/chats", async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });

    return res.json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "Failed to fetch chats" });
  }
});

export default allChatsRouter;
