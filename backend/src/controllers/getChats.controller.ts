import { Request, Response } from "express";
import asyncHandler from "../util/asyncHandler.util.js";
import { prisma } from "../db/prisma.js";

const getChats = asyncHandler(async (req: Request, res: Response) => {
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
});

export default getChats;
