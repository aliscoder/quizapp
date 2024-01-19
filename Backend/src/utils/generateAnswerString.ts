import _ from "lodash";
import Question from "../models/Question";
import mongoose from "mongoose";

export function generateAnswerString(ans: number) {
  const string = [];
  for (let i = 0; i < 15; i++) {
    string.push(_.random(1, 4).toString());
  }

  string[5] = ans.toString();

  return string.join("");
}

export async function isCorrect(
  qId: mongoose.Types.ObjectId,
  ans: number | string
) {
  const question = await Question.findOne({ _id: qId });
  const answer = question.questionId[5];

  return answer == ans.toString();
}
