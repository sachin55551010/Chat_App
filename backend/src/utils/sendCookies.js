import jwt from "jsonwebtoken";
export const sendCookies = (userId, res, message) => {
  const token = jwt.sign({ _id: userId._id }, process.env.SECRET_KEY);

  const user = userId.toObject();
  delete user.password;
  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ user, message, success: true });
};
