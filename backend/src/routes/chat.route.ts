import express from "express";
import OpenAI from "openai";
import { prisma } from "../db/prisma.js";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const chatRouter = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type DBMessage = {
  role: "USER" | "ASSISTANT";
  content: string;
};

chatRouter.post("/chat/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { question } = req.body;

  await prisma.message.create({
    data: { role: "USER", content: question, chatId },
  });

  const history = (await prisma.message.findMany({
    where: { chatId },
    select: { role: true, content: true },
  })) as DBMessage[];

  const formattedMessage: ChatCompletionMessageParam[] = history.map(
    (m): ChatCompletionMessageParam => {
      if (m.role === "USER") {
        return {
          role: "user",
          content: m.content,
        };
      }

      return {
        role: "assistant",
        content: m.content,
      };
    },
  );

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "you are a programming teacher, give precis and short responses",
    },
    ...formattedMessage,
    {
      role: "user",
      content: question,
    },
  ];

  const stream = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
    stream: true,
  });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");

  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullResponse += content;
      res.write(content);
    }
  }

  await prisma.message.create({
    data: { role: "ASSISTANT", content: fullResponse, chatId },
  });

  res.end();
});

export default chatRouter;
