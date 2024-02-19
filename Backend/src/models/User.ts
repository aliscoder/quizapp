import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserInterface extends Document {
  phone: string;
  avatar: string;
  username: string;
  password: string;
  coins: number;
  financial: {
    card: string;
    sheba:string;
    owner: string
  }
}

const userSchema: Schema = new mongoose.Schema<UserInterface>({
  phone: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  financial: {
    type : {
      card: String,
      sheba:String,
      owner:String
    },
    required: false,
    
  }
});

//@ts-ignore
const User: Model<UserInterface> = mongoose.model("User", userSchema);

export default User;
