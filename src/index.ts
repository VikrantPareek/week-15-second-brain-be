import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";
import { ContentModal, UserModal } from "./db.js";
import jwt from "jsonwebtoken";
import { userAuth } from "./middleware.js";
import type { ObjectId } from "mongoose";

let JWT_SECRET = process.env.JWT_SECRET;

let app = express();
app.use(express.json());

app.post("/api/v1/signup", function (req: Request, res: Response) {
  // password hashing
  // zod validation
  // password validations
  // error handling
  let { username, password } = req.body;
  UserModal.create({
    username,
    password,
  });
  res.json({
    message: "Done!",
  });
});

app.post("/api/v1/signin", async function (req: Request, res: Response) {
  // zod validations
  // verify user
  // error handling
  let { username, password } = req.body;
  let response = await UserModal.findOne({
    username,
    password,
  });
  if (response) {
    let token = jwt.sign({ username: username }, JWT_SECRET as string);
    res.json({
      message: token,
    });
  } else {
    res.json({
      message: "Incorrect creds!",
    });
  }
});

app.post("/api/v1/content", userAuth, function (req: Request, res: Response) {
  // zod validation
  // error handling
  // tags reference
  let userId = req.userId as string;
  let { title, link, type, tags } = req.body;
  ContentModal.create({
    title,
    link,
    type,
    tags,
    userId,
  });
  res.json({
    message: "Content Added",
  });
});

app.get(
  "/api/v1/content",
  userAuth,
  async function (req: Request, res: Response) {
    // error handling
    let userId = req.userId as string;
    let response = await ContentModal.find({ userId }).populate(
      "userId",
      "username",
    );
    res.json({
      message: response,
    });
  },
);

app.delete(
  "/api/v1/content",
  userAuth,
  async function (req: Request, res: Response) {
    // error handling
    // zod validation
    let userId = req.userId;
    let contentId = req.body.contentId;
    let response = await ContentModal.findOne({
      _id: contentId,
    });
    if (!response) {
      res.json({
        message: "Invalid content id!",
      });
      return;
    }
    if (response.userId) {
      if (userId != response.userId.toString()) {
        res.json({
          message: "This is not your content!",
        });
        return;
      }
      await ContentModal.deleteOne({
        _id: contentId,
      });
      res.json({
        message: "Content deleted successfully!",
      });
    }
  },
);

app.listen(3000);
