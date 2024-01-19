import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Player from "./User";
import User from "./User";

export type AvatarStatus = "before" | "start" | "after";

export interface AvatarInterface extends Document {
  url: string;
}

const avatarSchema: Schema = new mongoose.Schema<AvatarInterface>({
  url: {
    type: String,
    default: "https://iconape.com/wp-content/png_logo_vector/avatar.png",
  },
});

//@ts-ignore
const Avatar: Model<AvatarInterface> = mongoose.model("Avatar", avatarSchema);

export default Avatar;
