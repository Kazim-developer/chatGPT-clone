import express from "express";
import OpenAI from "openai";
import { prisma } from "../db/prisma.js";

const chatRouter = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

chatRouter.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const newChat = await prisma.chat.create({
      data: {
        name: question.slice(0, 30),
      },
    });

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

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    let fullResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        fullResponse += content;

        // send token to frontend
        res.write(content);
      }
    }

    // Save ONE complete conversation
    await prisma.conversation.create({
      data: {
        chatId: newChat.id,
        query: question,
        response: fullResponse,
      },
    });

    res.end();
  } catch (err: any) {
    console.error(err);

    if (!res.headersSent) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.end();
    }
  }
});

export default chatRouter;
