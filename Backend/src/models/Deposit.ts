import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface DepositInterface extends Document {
  userId: Types.ObjectId;
  secret: string;
  amount: number;
  status: "pending" | "rejected" | "done";
}

const depositSchema: Schema = new mongoose.Schema<DepositInterface>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

//@ts-ignore
const Deposit: Model<DepositInterface> = mongoose.model(
  "Deposit",
  depositSchema
);

export default Deposit;
