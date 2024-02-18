import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Player from "./User";

export type PlayerStatus = "waiting" | "started" | "finished";
export type GameStatus = PlayerStatus | "archived";
export type ChangeStatus = "idle" | "up" | "down";

export type Player = {
  user: Types.ObjectId | { _id: string };
  point: number;
  change?: ChangeStatus;
  prize?: number;
  rank?: number;
  status: PlayerStatus;
  latestQuestion: Types.ObjectId;
  duration?: number;
  timeStarted?: number;
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
        point: { type: Number, default: 0 },
        change: { type: String, enum: ["idle", "up", "down"], default: "idle" },
        prize: { type: Number, required: false },
        rank: { type: Number, required: false },
        status: {
          type: String,
          enum: ["waiting", "started", "finished"],
          default: "waiting",
        },
        latestQuestion: { type: Schema.Types.ObjectId, ref: "Question" },
        duration: { type: Number, default: 200 },
        timeStarted: { type: Number, required: false },
      },
    ],
  },
  status: {
    type: String,
    enum: ["waiting", "started", "finished", "archived"],
    default: "waiting",
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

//@ts-ignore
const Game: Model<GameInterface> = mongoose.model("Game", gameSchema);

export default Game;
