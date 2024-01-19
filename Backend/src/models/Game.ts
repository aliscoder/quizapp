import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Player from "./User";
import User from "./User";
import moment from "jalali-moment";

export type GameStatus = "before" | "start" | "after";

export type Player = {
  user: Types.ObjectId;
  point: number;
  isUp: boolean;
  prize: number;
  rank: number;
  status: "done" | "wait" | "in";
  latestQuestion: Types.ObjectId
};

export interface GameInterface extends Document {
  type: number;
  startTime: number;
  endTime: number;
  image: string;
  players: Player[];
  status: GameStatus;
  questions: Types.ObjectId[];
}

const gameSchema: Schema = new mongoose.Schema<GameInterface>({
  type: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  players: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        point: Number,
        isUp: Boolean,
        prize: Number,
        rank: Number,
        status: {type: String , default: 'wait' , required: true},
        latestQuestion: {type: Schema.Types.ObjectId, ref: 'Question'}
      },
      
    ],
    
  },
  status: {
    type: String,
    required: true,
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});



//@ts-ignore
const Game: Model<GameInterface> = mongoose.model("Game", gameSchema);

export default Game;
