import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface AnswerInterface extends Document {
  question: Types.ObjectId;
  answer: number;
}

const answerSchema: Schema = new mongoose.Schema<AnswerInterface>({
  question: Schema.Types.ObjectId,
  answer: Number,
});

//@ts-ignore
const Answer: Model<AnswerInterface> = mongoose.model("Answer", answerSchema);

export default Answer;
