import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface QuestionInterface extends Document {
  body: string;
  options: [string, string, string, string];
}

const questionSchema: Schema = new mongoose.Schema<QuestionInterface>({
  body: {
    type: String,
    required: true,
  },
  options: {
    type: [String, String, String, String],
    required: true,
  },
});

//@ts-ignore
const Question: Model<QuestionInterface> = mongoose.model(
  "Question",
  questionSchema
);

export default Question;
