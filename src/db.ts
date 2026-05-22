import dotenv from "dotenv";
dotenv.config();

import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.CONNECTION_STRING as string);

let userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

let contentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: false },
});

let linkSchema = new Schema({
  hash: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
});

export let UserModal = mongoose.model("User", userSchema);
export let ContentModal = mongoose.model("Content", contentSchema);
export let LinkModal = mongoose.model("Link", linkSchema);
