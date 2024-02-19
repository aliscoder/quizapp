import express from "express";
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controllers/question";

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);
questionRouter.post("/add", addQuestion);
questionRouter.put("/:id/update", updateQuestion);
questionRouter.delete("/:id", deleteQuestion);

export default questionRouter;
