import express from "express";
import OpenAI from "openai";
import { prisma } from "../db/prisma.js";

const chatRouter = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

chatRouter.post("/chat/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { question } = req.body;

  const stream = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "Answer only from the provided context.",
      },
      {
        role: "user",
        content: question,
      },
    ],
    stream: true,
  });

  res.setHeader("Content-Type", "text/plain");

  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullResponse += content;
      res.write(content);
    }
  }

  await prisma.conversation.create({
    data: {
      chatId,
      query: question,
      response: fullResponse,
    },
  });

  res.end();
});

export default chatRouter;
