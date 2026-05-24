import { Request, Response } from "express";
import asyncHandler from "../util/asyncHandler.util.js";
import { prisma } from "../db/prisma.js";

const getChatGroups = asyncHandler(async (req: Request, res: Response) => {
  const groups = await prisma.group.findMany({
    select: { name: true, chat: true, id: true },
  });

  res.status(200).json({ message: "request successful", groups });
});

export default getChatGroups;
