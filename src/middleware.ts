import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModal } from "./db.js";

let JWT_SECRET = process.env.JWT_SECRET as string;

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let Token = req.headers.token as string;
  if (!Token) {
    res.json({
      message: "You are not signed up!",
    });
    return;
  }
  let decodedUser = jwt.verify(Token, JWT_SECRET) as { username: string };
  let response = await UserModal.findOne({
    username: decodedUser.username,
  });
  if (!response) {
    res.json({
      message: "Incorrect Creds!",
    });
    return;
  }
  req.userId = response._id.toString();
  next();
}

export function hashFn() {
  let str = "qwertyuiopasdfghjklzxcvbnm";
  let hash: string = "";
  for (let i = 0; i < 10; i++) {
    hash += str[Math.floor(Math.random() * 26)];
  }
  return hash;
}
