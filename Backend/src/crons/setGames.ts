import moment from "jalali-moment";
import Game from "../models/Game";
import { random, sample } from "lodash";
import User from "../models/User";
import Question from "../models/Question";
import { IMAGES } from "../images";

export async function setGames(req: any, res: any) {
  await Game.remove();

  const startOfDay = moment().startOf("day").unix();
  const endOfDay = moment().endOf("day").unix();

  const totalGamesCount = (endOfDay - startOfDay) / (10 * 60);

  const users = await User.find();
  const questions = await Question.find();

  for (let i = 0; i < totalGamesCount; i++) {
    const startTime = startOfDay + i * 10 * 60;
    const endTime = startTime + 590;

    const players = [];
    for (let j = random(1, 5); j < random(6, 20); j++) {
      players.push({ user: users[j]._id, point: 0, isUp: false });
    }

    const qs : any[] = [];
    for (let j = 0; j < 10; j++) {
      
      const randomQ = questions[j + random(1, 150)];
      

            if(!qs.includes(randomQ)) {
              qs.push(randomQ);
            }else{
               j--
            }
      
      

    }

    await Game.create({
      type: sample([10000, 20000, 50000]),
      startTime,
      endTime,
      image: sample(IMAGES),
      players,
      status: "before",
      questions: qs,
    });
  }

  res.status(200).json("Done");
}
