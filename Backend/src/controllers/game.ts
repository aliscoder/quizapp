import { Request, Response } from "express";
import { Types } from "mongoose";
import { faker } from "@faker-js/faker/locale/fa";
import _, { random, round, sample } from "lodash";
import moment from "jalali-moment";
import Game from "../models/Game";
import { IMAGES } from "../images";
import User from "../models/User";
import { createPassword } from "../utils/password";
import Question from "../models/Question";
import Avatar from "../models/Avatar";
import { generateAnswerString, isCorrect } from "../utils/generateAnswerString";

export const seedGames = async (req: Request, res: Response) => {
  await Game.remove();
  await Question.remove();
  await Avatar.remove();

  for (let i = 0; i < 20; i++) {
    const image = faker.image.avatar();
    await Avatar.create({
      url: image,
    });
  }

  const avatars = await Avatar.find();

  for (let i = 0; i < 200; i++) {
    await User.create({
      name: faker.name.fullName(),
      phone: faker.phone.number("0913#######"),
      point: _.random(0, 500),
      avatar: _.sample(avatars.map((item) => item._id)),
      username: "User " + (i + 1),
      password: await createPassword("123456789"),
    });
  }

  for (let i = 0; i < 200; i++) {
    await Question.create({
      body: faker.lorem.sentences(_.random(1, 3)),
      option1: faker.word.noun({ length: _.random(3, 8) }),
      option2: faker.word.noun({ length: _.random(3, 8) }),
      option3: faker.word.noun({ length: _.random(3, 8) }),
      option4: faker.word.noun({ length: _.random(3, 8) }),
      questionId: generateAnswerString(_.random(1, 4)),
    });
  }

  const startOfDay = moment().startOf("day").unix();
  const endOfDay = moment().endOf("day").unix();

  const totalGamesCount = (endOfDay - startOfDay) / (10 * 60);

  const users = await User.find();
  const questions = await Question.find();

  for (let i = 0; i < totalGamesCount; i++) {
    const startTime = startOfDay + i * 10 * 60;
    const endTime = startTime + 60;

    const qs: any[] = [];
    for (let j = 0; j < 10; j++) {

      function getRandomQ () {
        return questions[j + random(1, 150)];
      }

      if(qs.includes(getRandomQ())) {
        getRandomQ()
      }else {
        qs.push(getRandomQ());
      }

     
      
    }

    const players = [];
    for (let j = random(1, 5); j < random(6, 20); j++) {
      players.push({ user: users[j]._id, point: 0, isUp: false, latestQuestion: qs[0] });
    }

    

    await Game.create({
      type: sample([10000, 20000, 50000]),
      startTime,
      endTime,
      image: sample(IMAGES),
      players,
      questions: qs,
    });
  }

  res.status(200).json("done");
};

export const getAllGames = async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  const allGames = await Game.find({
    endTime: { $gte: moment().unix() },
  }).populate("players.user");

  const userGames = await Game.find({ endTime: { $gte: moment().unix() },
    "players.user": { $in: userId },
  }).populate("players.user");

  if(!(allGames[0]?.players?.find(player => player.user._id == (userId as any)))) {
    allGames.shift()
  }
  res.status(200).json({ all: allGames, mine: userGames });
};

export const getGame = async (req: Request, res: Response) => {
  const { userId, gameId } = req.params;
  const game = await Game.findOne({ _id: gameId }).populate('players.user');
  const latestQuestionId = game.players.find(player => player.user._id == (userId as any)).latestQuestion;
  const latestQuestion = await Question.findById(latestQuestionId);

  if(game.status === 'start') {
    await Game.updateOne(
      { "players.user": userId },
      { $set: { status: "in" } }
    );
  }

  const isPlayerDone = game?.players.find(player => player.user._id == (userId as any))?.status == 'done'
  res.status(200).json({ ...game.toObject(), nowTime: moment().unix(), latestQuestion : game.status === 'start' ? latestQuestion : null, isPlayerDone });
};


export const answerQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { playerId, qId, answer } = req.body;

  const game = await Game.findOne({ _id: id }).populate("questions");
  const player = game.players.find((item) => item.user._id == playerId);

  if(qId == player.latestQuestion) {

    if (game.endTime >= moment().unix()) {
      const currentQIndex = game.questions.findIndex((item) => item._id == qId);
      const nextQ = game.questions[currentQIndex + 1];
      const isItCorrect = await isCorrect(qId, answer);

      await Game.updateOne(
        { _id: id, "players.user": playerId },
        {
          $set: {
            "players.$.latestQuestion": nextQ,
          },
        }
      );

      if (isItCorrect) {
        await Game.updateOne(
          { _id: id, "players.user": playerId },
          {
            $set: {
              "players.$.point": player.point + 5,
              "players.$.isUp": true,
            },
          }
        );
      } else {
        await Game.updateOne(
          { _id: id, "players.user": playerId },
          {
            $set: { "players.$.isUp": false },
          }
        );
      }

      if (!nextQ) {
        await Game.updateOne(
          { _id: id, "players.user": playerId },
          {
            $set: {
              "players.$.status": "done",
            },
          }
        );
        res.status(200).json("Done");
      } else {
        res.status(200).json(nextQ);
      }
    } else {
      res.status(400).json({ error: "زمان مسابقه به پایان رسیده است" });
    }
  }
  
    
  
};


export const registerGame = async (req: Request, res: Response) => {
  const { userId, gameId } = req.body;

  const game = await Game.findOne({ _id: gameId });
  const user = await User.findOne({ _id: userId });

  if(game.players.find(item =>  item.user == userId)) {
    res.status(400).json({ error: 'شما قبلا ثبت نام کرده اید' });
  }else {

  
  if (user.coin >= game.type) {
    if (game.startTime > moment().unix()) {
      if (
        game.players.map((item) => item.user).includes(userId as Types.ObjectId)
      ) {
        await Game.updateOne(
          { _id: gameId },
          {
            $pull: { "players.user": userId },
          },
          { new: true }
        );
        await User.updateOne(
          { _id: userId },
          {
            $inc: { coin: game.type },
          },
          { new: true }
        );
      } else {
        await Game.updateOne(
          { _id: gameId },
          {
            $push: {
              players: {
                user: userId,
                point: 0,
                isUp: false,
                rank: 0,
                prize: 0,
                status: "wait",
                latestQuestion: game.questions[0]
              },
            },
          },
          { new: true }
        );
        await User.updateOne(
          { _id: userId },
          {
            $inc: { coin: -game.type },
          },
          { new: true }
        );
      }

      res.status(200).json(game);
    } else {
      res.status(400).json({ error: "زمان ثبت نام گذشته است" });
    }
  } else {
    res.status(400).json({ error: "موجودی کافی نیست" });
  }
}
};
