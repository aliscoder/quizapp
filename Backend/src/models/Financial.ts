import moment from "jalali-moment";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface FinancialInterface extends Document {
  userId: Types.ObjectId;
  secret?: string;
  amount: number;
  status: "pending" | "rejected" | "done";
  createdAt: number
  type: 'cashout' | 'deposit'
}

const financialSchema: Schema = new mongoose.Schema<FinancialInterface>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  secret: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Number,
    default: moment().unix(),
  },
  type: {
    type: String,
    enum: ['deposit', 'cashout'],
    required: true
  }
});

//@ts-ignore
const Financial: Model<FinancialInterface> = mongoose.model(
  "Financial",
  financialSchema
);

export default Financial;
