import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized please login");
    }
    // verify token
    const verfied = jwt.verify(token, process.env.JWT_SECRET);
    // get user id form token
    const user = await User.findById(verfied.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Not authorized please login");
  }
});
// a middleware to protect admin routes
export const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});
// a middleware to protect shared admin and editor routes
export const EditorAndAdmin = asyncHandler(async (req, res, next) => {
  if (
    (req.user && req.user.role === "Web Editor") ||
    req.user.role === "Admin"
  ) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an web editor");
  }
});
// a middleware to protect verfied user routes
export const verfiedOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerfied) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized acount not verified");
  }
});
// a middleware to block suspended users
export const blockSuspended = asyncHandler(async (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "Admin" ||
      req.user.role === "User" ||
      req.user.role === "Web Editor")
  ) {
    next();
  } else {
    res.status(401);
    throw new Error("Sorry, you have been suspended");
  }
});
