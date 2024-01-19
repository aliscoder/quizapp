import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type QuestionStatus = "before" | "start" | "after";

export interface QuestionInterface extends Document {
  body: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  questionId: string;
}

const questionSchema: Schema = new mongoose.Schema<QuestionInterface>({
  body: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
});

//@ts-ignore
const Question: Model<QuestionInterface> = mongoose.model(
  "Question",
  questionSchema
);

export default Question;
