import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Avatar from "./Avatar";

export interface UserInterface extends Document {
  phone: string;
  point: number;
  avatar: Types.ObjectId;
  username: string;
  password: string;
  coin: number;
}

const userSchema: Schema = new mongoose.Schema<UserInterface>({
  phone: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    default: 0,
  },
  coin: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre(["findOne", "find"], function (next) {
  this.populate({
    path: "avatar",
    model: Avatar,
    select: ["_id", "url"],
  });
  next();
});

//@ts-ignore
const User: Model<UserInterface> = mongoose.model("User", userSchema);

export default User;
