import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModal } from "./db.js";

let JWT_SECRET = process.env.JWT_SECRET as string;

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let Token = req.headers.token as string;
    if (!Token) {
      return res.status(401).json({
        message: "You are not logged in!",
      });
    }
    let decodedUser;
    try {
      decodedUser = jwt.verify(Token, JWT_SECRET) as { _id: string };
    } catch (e) {
      return res.status(401).json({
        message: "Invalid token!",
      });
    }
    let response = await UserModal.findOne({
      _id: decodedUser._id,
    });
    if (!response) {
      return res.status(400).json({
        message: "Incorrect Creds!",
      });
    }
    req.userId = response._id.toString();
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Some server error!",
    });
  }
}

export function hashFn() {
  let str = "qwertyuiopasdfghjklzxcvbnm";
  let hash: string = "";
  for (let i = 0; i < 10; i++) {
    hash += str[Math.floor(Math.random() * 26)];
  }
  return hash;
}
