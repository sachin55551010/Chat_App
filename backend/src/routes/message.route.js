import express from "express";
import { protectRoute } from "../middlewares/authentication.js";
import {
  getMessages,
  getUserForChatHeader,
  getUsersForSidebar,
  sendMessages,
} from "../controllers/message.controller.js";

export const messageRoute = express.Router();

messageRoute.get("/users", protectRoute, getUsersForSidebar);

messageRoute.post("/send/:id", protectRoute, sendMessages);

messageRoute.get("/user/:id", protectRoute, getUserForChatHeader);

messageRoute.get("/chat/:id", protectRoute, getMessages);
