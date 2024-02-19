import { Response, Request } from "express";
import Question from "../models/Question";
import Answer from "../models/Answer";


export const getQuestions = async (req: Request, res: Response) => {

    const questions = await Question.find()

    res.status(200).json(questions)
}

export const addQuestion = async (req: Request, res: Response) => {
    const { body, op1, op2, op3, op4, answer } = req.body;

    if (!answer || !body || !op1 || !op2 || !op3 || !op4) {
        res.status(400).json('bad request')
    } else {
        const question = new Question({
            body,
            options: [op1, op2, op3, op4]
        })

        const savedQ = await question.save();

        const qAnswer = new Answer({
            question: savedQ._id,
            answer
        })

        await qAnswer.save()


        res.status(200).json('done')
    }


}

export const updateQuestion = async (req: Request, res: Response) => {
    const { body, op1, op2, op3, op4, answer } = req.body;
    const { id } = req.params

    if (!answer || !body || !op1 || !op2 || !op3 || !op4) {
        res.status(400).json('bad request')
    } else {

        const question = await Question.findByIdAndUpdate(id, {
            $set: {
                body,
                options: [op1, op2, op3, op4],
            }
        })

        await Answer.findOneAndUpdate({ question: question._id }, { $set: { answer } })


        res.status(200).json('done')
    }
}

export const deleteQuestion = async (req: Request, res: Response) => {
    const { id } = req.params

    const question = await Question.findByIdAndDelete(id)

    await Answer.findOneAndDelete({ question: question._id })

    res.status(200).json('done')
}