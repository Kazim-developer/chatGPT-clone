import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import allChatsRouter from "./routes/allChats.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5000"], credentials: true }));

app.use(express.json());

app.use(allChatsRouter);

app.listen(5000, () => {
  console.log("server is running");
});
