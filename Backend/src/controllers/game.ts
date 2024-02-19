import { Request, Response } from "express";
import _ from "lodash";
import moment from "jalali-moment";
import Game from "../models/Game";
import User from "../models/User";
import Answer from "../models/Answer";
import Question from "../models/Question";
import { changeStatus } from "../utils/changeGameStatus";

export const getAllGames = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const allGames = await Game.find({
    endTime: { $gte: moment().unix() },
  }).populate("players.user");

  const userGames = await Game.find({
    endTime: { $gte: moment().unix() },
    "players.user": { $in: userId },
  }).populate("players.user");

  if (
    !allGames[0].players.some((player) => player.user._id == userId) &&
    allGames[0].status !== "waiting"
  ) {
    allGames.shift();
  }

  res.status(200).json({ all: allGames, mine: userGames });
};

export const getGame = async (req: Request, res: Response) => {
  const { userId, gameId } = req.params;
  const game = await Game.findById(gameId)
    .populate("players.user")
    .populate("players.latestQuestion");

  const isPlayerDone =
    game.players.find((player) => player.user._id == userId).status ==
    "finished";

  if (game.status === "started" && !isPlayerDone) {
    const player = game.players.find((player) => player.user._id == userId);
    player.status = "started";
    player.timeStarted = moment().unix()
  }

  res.status(200).json(game);
};

export const registerGame = async (req: Request, res: Response) => {
  const { userId, gameId } = req.body;

  const game = await Game.findOne({ _id: gameId });
  const user = await User.findOne({ _id: userId });

  const userAsPlayer = game.players.some((item) => item.user == userId)
    ? game.players.find((item) => item.user == userId)
    : null;

  if (userAsPlayer) {
    res.status(400).json({ error: "شما قبلا ثبت نام کرده اید" });
  } else if (user.coins < game.type) {
    res.status(400).json({ error: "موجودی کافی نیست" });
  } else if (game.startTime <= moment().unix()) {
    res.status(400).json({ error: "زمان ثبت نام گذشته است" });
  } else {
    await Game.updateOne(
      { _id: gameId },
      {
        $push: {
          players: {
            user: userId,
            latestQuestion: game.questions[0],
          },
        },
      }
    );
    await User.updateOne(
      { _id: userId },
      {
        $inc: { coins: -game.type },
      }
    );
  }

  res.status(200).json({ status: "registered" });
};

export const answerQuestion = async (req: Request, res: Response) => {
  const { id: gameId } = req.params;
  const { playerId, qId, answer } = req.body;

  const game = await Game.findOne({ _id: gameId });
  const player = game.players.find((item) => item.user == playerId);


  if (qId != player.latestQuestion) {
    res.status(409).json("سوال اشتباه");
  } else if (game.endTime < moment().unix()) {
    res.status(400).json({ error: "زمان مسابقه به پایان رسیده است" });
  } else {
    const currentQIndex = game.questions.findIndex((item) => item == qId);
    const nextQId = game.questions[currentQIndex + 1];
    const qAnswer = await Answer.findOne({ question: qId });
    const isCorrect = qAnswer.answer == answer;

    

    await Game.updateOne(
      { _id: gameId, "players.user": playerId },
      {
        $set: {
          "players.$.latestQuestion": !nextQId
            ? player.latestQuestion
            : nextQId,
          "players.$.point": isCorrect ? player.point + 5 : player.point,
          "players.$.change": isCorrect ? "up" : "down",
          "players.$.status": !nextQId ? "finished" : player.status,
          "players.$.duration": !nextQId
            ? isNaN(moment().unix() - player.timeStarted) ? 200 : moment().unix() - player.timeStarted
            : player.duration,
        },
      }
    );

    const nextQ = nextQId ? await Question.findById(nextQId) : null;

    res.status(200).json(nextQ);
  }
};

export const changeGameStatus = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const game = await Game.findById(gameId);

  changeStatus(game._id);

  res.status(200).json("status changed");
};
