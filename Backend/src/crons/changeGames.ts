import moment from "jalali-moment";
import Game from "../models/Game";
import { changeStatus } from "../utils/changeGameStatus";

export async function changeGames() {
  const games = await Game.find({
    startTime: { $gte: moment().subtract(1, "hour").unix() },
  });

  games.forEach(async (game) => {
    await changeStatus(game._id);
  });
}
