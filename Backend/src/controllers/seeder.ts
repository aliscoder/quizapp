import { random, sample } from "lodash";
import { IMAGES } from "../images";
import Game from "../models/Game";
import Question from "../models/Question";
import User from "../models/User";
import moment from "jalali-moment";
import { Request, Response } from "express";
import { faker } from "@faker-js/faker/locale/fa";
import { createPassword } from "../utils/password";
import { Player } from "../models/Game";
import Answer from "../models/Answer";

export const seedGames = async (req: Request, res: Response) => {
  await Game.remove();
  // await User.remove();
  await Question.remove();
  // await Answer.remove();

  if ((await User.count()) == 0) {
    for (let i = 0; i < 200; i++) {
      const avatar = faker.image.imageUrl();

      await User.create({
        name: faker.name.fullName(),
        phone: faker.phone.number("0913#######"),
        point: random(0, 500),
        avatar,
        username: "User " + (i + 1),
        password: await createPassword("123456789"),
      });
    }
  }

  if ((await Question.count()) == 0) {
    for (let i = 0; i < 200; i++) {
      const question = await Question.create({
        body: faker.lorem.sentences(random(1, 3)),
        options: [...Array(4).keys()].map(() =>
          faker.word.noun({ length: random(3, 8) })
        ),
      });

      await Answer.create({
        question: question._id,
        answer: random(0, 3),
      });
    }
  }

  const startOfDay = moment().startOf("day").unix();
  const endOfDay = moment().endOf("day").unix();

  const totalGamesCount = (endOfDay - startOfDay) / (5 * 60);

  const users = await User.find();
  const questions = await Question.find();

  for (let i = 0; i < totalGamesCount; i++) {
    const startTime = startOfDay + i * 5 * 60;
    const endTime = startTime + 180;

    const qs: any[] = [];

    function getRandomQ() {
      return questions[random(1, 150)];
    }

    for (let j = 0; qs.length < 10; j++) {
      const randQ = getRandomQ();
      if (!qs.some((q) => q == randQ)) {
        qs.push(randQ);
      }
    }

    const players: Player[] = [];
    for (let j = random(1, 5); j < random(6, 20); j++) {
      players.push({
        user: users[j]._id,
        point: 0,
        status: "waiting",
        latestQuestion: qs[0],
      });
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
