import { Request, Response } from "express";
import asyncHandler from "../util/asyncHandler.util.js";
import { prisma } from "../db/prisma.js";
import AppError from "../util/customErrorClass.util.js";

const createChat = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await prisma.$transaction(async (tx) => {
    const existingGroup = await prisma.group.findUnique({
      where: { name: data.chatGroup },
    });

    let group: any;
    let newChat: any;

    if (existingGroup) {
      const existingChat = await prisma.chat.findFirst({
        where: { name: data.chatName },
      });

      if (existingChat) {
        throw new AppError(
          `chat name already exists in ${existingGroup.name} group`,
          403,
        );
      }

      newChat = await tx.chat.create({
        data: { name: data.chatName, groupId: existingGroup.id },
      });
    } else {
      group = await prisma.group.create({ data: { name: data.chatGroup } });
      newChat = await tx.chat.create({
        data: { name: data.chatName, groupId: group.id },
      });
    }

    return {
      groupName: existingGroup ? existingGroup.name : group.name,
      chatId: newChat.id,
    };
  });

  res.status(201).json({ message: "chat group is created", result });
});

export default createChat;
