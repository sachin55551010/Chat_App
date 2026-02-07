import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/authentication.js";

export const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.get("/check", protectRoute, checkAuth);
authRoute.put("/update-profile", protectRoute, updateProfile);
