import jwt from "jsonwebtoken";
import { CustomErrHandler } from "../middlewares/CustomErrHandler.js";
export const protectRoute = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomErrHandler(400, "Please login first"));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded)
    return next(new CustomErrHandler(400, "Unautherized - Invalid Token"));
  req.user = decoded;
  next();
};
