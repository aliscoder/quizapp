import moment from "jalali-moment";
import Game from "../models/Game";

export async function changeGames() {
  const games = await Game.find();

  games.forEach(async (game) => {
    if (moment().unix() > game.endTime) {
      await Game.findByIdAndUpdate(game._id, {
        $set: { status: "after" },
      });
    } else if (
      game.startTime <= moment().unix() &&
      game.endTime >= moment().unix()
    ) {
      if (game.players && game.players.length >= 2) {
        await Game.findByIdAndUpdate(game._id, {
          $set: { status: "start" },
        });
      } else {
        await Game.findByIdAndUpdate(game._id, {
          $set: { status: "after" },
        });
      }
    }
  });
}
