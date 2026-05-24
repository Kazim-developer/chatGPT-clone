import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import getChatsRouter from "./routes/getChats.route.js";
import createChatRouter from "./routes/createChat.route.js";
import getChatGroupsRouter from "./routes/getChatGroups.route.js";
import errorHandler from "./middleware/globalErrorHandler.middleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.use(express.json());

app.use(getChatsRouter);
app.use(createChatRouter);
app.use(getChatGroupsRouter);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("server is running");
});
