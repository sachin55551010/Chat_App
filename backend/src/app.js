import express from "express";
import dotenv from "dotenv";
import { authRoute } from "./routes/user.route.js";
import { connectMongoDB } from "./utils/connectMongoDB.js";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import { messageRoute } from "./routes/message.route.js";
import cors from "cors";
import { app, server, io } from "./utils/socket.js";

dotenv.config();

// middlewares
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

//routes
app.get("/", (_, res) => {
  return res.status(200).send("App working fine !");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);

// custom error handler function
app.use(errorHandler);
connectMongoDB();
const PORT = process.env.PORT || 5000;

export function getReceiverSocketId(userId) {
  return socketUserMap[userId];
}
const socketUserMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) socketUserMap[userId] = socket.id;

  //* get all online users
  io.emit("getAllOnlineUser", Object.keys(socketUserMap));

  socket.on("disconnect", () => {
    delete socketUserMap[userId];
    io.emit("getAllOnlineUser", Object.keys(socketUserMap));
  });
});

// connect to server
server.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
