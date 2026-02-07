import cloudinary from "../utils/cloudinary.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";
import { CustomErrHandler } from "../middlewares/CustomErrHandler.js";
import mongoose from "mongoose";
import { getReceiverSocketId } from "../app.js";
import { io } from "../utils/socket.js";

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({ filteredUsers, success: true });
  } catch (error) {
    console.log("getUserForSidebar error : ", error);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    if (!userToChatId || !mongoose.Types.ObjectId.isValid(userToChatId)) {
      return next(new CustomErrHandler(400, "id is not valid or undefined"));
    }

    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json({ messages, success: true });
  } catch (error) {
    console.log("getMessage error : ", error);
    next(error);
  }
};

export const sendMessages = async (req, res, next) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  try {
    const senderId = req.user._id;
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || "",
    });
    await newMessage.save();

    const senderSocketId = getReceiverSocketId(senderId); // senderId is from req.user._id
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    if (senderSocketId && senderSocketId !== receiverSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ newMessage, success: true });
  } catch (error) {
    console.log("sendMessage error : ", error);
    next(error);
  }
};

export const getUserForChatHeader = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return next(new CustomErrHandler(400, "Invalid or missing user id"));
    }
    const user = await User.findById(id).select("fullName profilePic");
    if (!user) return next(new CustomErrHandler(400, "No User found"));

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log("Get User Profile Error : ", error);
    next(error);
  }
};
