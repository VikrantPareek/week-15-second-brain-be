import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";
import { ContentModal, LinkModal, UserModal } from "./db.js";
import jwt from "jsonwebtoken";
import { hashFn, userAuth } from "./middleware.js";
import * as z from "zod";
import bcrypt from "bcrypt";

let JWT_SECRET = process.env.JWT_SECRET;

let app = express();
app.use(express.json());

app.post("/api/v1/signup", async function (req: Request, res: Response) {
  // error handling
  let Data = z.object({
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[!@#$%^&*]/),
    username: z.string().min(3).max(20),
  });
  let parsedDetails = Data.parse(req.body);
  let hashPass = await bcrypt.hash(parsedDetails.password, 15);
  UserModal.create({
    username: parsedDetails.username,
    password: hashPass,
  });
  res.status(200).json({
    message: "You are signed up successfully!",
  });
});

app.post("/api/v1/signin", async function (req: Request, res: Response) {
  // error handling
  let Data = z.object({
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[!@#$%^&*]/),
    username: z.string().min(3).max(20),
  });
  let parsedDetails = Data.parse(req.body);
  let response = await UserModal.findOne({
    username: parsedDetails.username,
  });
  if (response?.password) {
    let decodedPass = await bcrypt.compare(parsedDetails.password, response.password);
    if (decodedPass) {
      let token = jwt.sign(
        { username: parsedDetails.username },
        JWT_SECRET as string,
      );
      res.status(200).json({
        message: "You are signed in successfully!",
        token,
      });
    } else {
      res.status(400).json({
        message: "Incorrect creds!",
      });
    }
  }
});

app.post("/api/v1/content", userAuth, function (req: Request, res: Response) {
  // error handling
  let Data = z.object({
    title: z.string().min(5),
    link: z.string().min(5),
    type: z.string().min(3),
    tags: z.array(z.string()),
  });
  let userId = req.userId as string;
  let parsedDetails = Data.parse(req.body);
  ContentModal.create({
    title: parsedDetails.title,
    link: parsedDetails.link,
    type: parsedDetails.type,
    tags: parsedDetails.tags,
    userId: userId,
  });
  res.status(200).json({
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
    res.status(200).json({
      message: response,
    });
  },
);

app.delete(
  "/api/v1/content",
  userAuth,
  async function (req: Request, res: Response) {
    // error handling
    let Data = z.object({
      contentId: z.string(),
    });
    let userId = req.userId;
    let parsedDetails = Data.parse(req.body);
    let response = await ContentModal.findOne({
      _id: parsedDetails.contentId,
    });
    if (!response) {
      res.status(400).json({
        message: "Invalid content id!",
      });
      return;
    }
    if (response.userId) {
      if (userId != response.userId.toString()) {
        res.status(403).json({
          message: "This is not your content!",
        });
        return;
      }
      await ContentModal.deleteOne({
        _id: parsedDetails.contentId,
      });
      res.status(200).json({
        message: "Content deleted successfully!",
      });
    }
  },
);

app.post(
  "/api/v1/brain/share",
  userAuth,
  async function (req: Request, res: Response) {
    // error handling
    let Data = z.boolean();
    let userId = req.userId as string;
    let parsedBool = Data.parse(req.body.share);
    let hash = hashFn();
    if (parsedBool != true) {
      let response = await LinkModal.findOne({
        userId,
      });
      if (response) {
        await LinkModal.deleteOne({ userId });
        res.status(200).json({
          message: "Stopped Sharing!",
        });
        return;
      } else {
        res.status(400).json({
          message: "You did't shared your brain!",
        });
        return;
      }
    }
    await LinkModal.create({
      userId: userId,
      hash: hash,
    });
    res.status(200).json({
      link: hash,
    });
  },
);

app.get(
  "/api/v1/brain/:shareLink",
  async function (req: Request, res: Response) {
    // error handling
    let Data = z.string();
    let shareLink = Data.parse(req.params.shareLink);
    let linkData = await LinkModal.findOne({ hash: shareLink });
    if (!linkData) {
      res.status(404).json({
        message: "Invalid share id!",
      });
      return;
    }
    if (linkData.userId) {
      let user = await UserModal.findOne({ _id: linkData.userId });
      let content = await ContentModal.find({
        userId: linkData.userId,
      });
      res.status(200).json({
        data: {
          username: user?.username,
          content: content,
        },
      });
    }
  },
);

app.listen(3000);
