import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { CustomErrHandler } from "../middlewares/CustomErrHandler.js";
import { sendCookies } from "../utils/sendCookies.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName?.trim() || !email?.trim() || !password?.trim())
      return next(new CustomErrHandler(400, "All fields are required"));

    let user = await User.findOne({ email });

    if (user) return next(new CustomErrHandler(400, "User already exists !"));

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    sendCookies(user, res, "User created successfully !");
  } catch (error) {
    console.log("Singup error : ", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email?.trim() || !password?.trim())
      return next(new CustomErrHandler(400, "All fields are required !"));

    let user = await User.findOne({ email });
    if (!user) return next(new CustomErrHandler(400, "Invalid credentials !"));

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return next(new CustomErrHandler(400, "Invalid credentials !"));

    sendCookies(user, res, "Login successful !");
  } catch (error) {
    console.log("login error : ", error);
    next(error);
  }
};
export const logout = async (_, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({ message: "Logout successfully !", success: true });
  } catch (error) {
    console.log("logout error : ", error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const { profilePic } = req.body;
  try {
    const userId = req.user._id;
    if (!profilePic)
      return next(new CustomErrHandler(400, "Profile pic is required"));

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json({
      updatedUser,
      message: "Profile pic updated successfully !",
      success: true,
    });
  } catch (error) {
    console.log("updateProfile error : ", error);
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).select("-password");
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log("checkAuth error : ", error);
    next(error);
  }
};
