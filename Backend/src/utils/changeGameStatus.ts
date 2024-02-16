import moment from "jalali-moment";
import Game from "../models/Game";
import { round } from "lodash";
import User from "../models/User";

export async function getPrizes(gameId: string) {
  const game = await Game.findOne({ _id: gameId });

  const sorted = game.players.sort((a, b) => b.point - a.point);
  const totalPrize = game.players.length * game.type; // 10 * 50000 = 500000

  const first = sorted[0]; // {user : string , point: 15 , ....}
  const second = sorted[1];
  const third = sorted[2];

  if (game.players.length <= 4) {
    await User.findOneAndUpdate(
      { _id: first.user },
      { $inc: { coins: round(totalPrize * 0.8) } }
    );
    await Game.updateOne(
      { _id: game._id, "players.user": first.user },
      {
        $set: {
          "players.$.rank": 1,
          "players.$.prize": round(totalPrize * 0.8),
        },
      }
    );
  } else if (game.players.length > 4 && game.players.length <= 8) {
    // 60% first , 20% second
    await User.findOneAndUpdate(
      { _id: first.user },
      { $inc: { coins: round(totalPrize * 0.6) } }
    );
    await User.findOneAndUpdate(
      { _id: second.user },
      { $inc: { coins: round(totalPrize * 0.2) } }
    );
    await Game.updateOne(
      { _id: game._id, "players.user": first.user },
      {
        $set: {
          "players.$.rank": 1,
          "players.$.prize": round(totalPrize * 0.6),
        },
      }
    );
    await Game.updateOne(
      { _id: game._id, "players.user": second.user },
      {
        $set: {
          "players.$.rank": 2,
          "players.$.prize": round(totalPrize * 0.2),
        },
      }
    );
  } else {
    // 50% first , 20% second , 10% third

    await User.findOneAndUpdate(
      { _id: first.user },
      { $inc: { coins: round(totalPrize * 0.5) } }
    );
    await User.findOneAndUpdate(
      { _id: second.user },
      { $inc: { coins: round(totalPrize * 0.2) } }
    );
    await User.findOneAndUpdate(
      { _id: third.user },
      { $inc: { coins: round(totalPrize * 0.1) } }
    );
    await Game.updateOne(
      { _id: game._id, "players.user": first.user },
      {
        $set: {
          "players.$.rank": 1,
          "players.$.prize": round(totalPrize * 0.5),
        },
      }
    );
    await Game.updateOne(
      { _id: game._id, "players.user": second.user },
      {
        $set: {
          "players.$.rank": 2,
          "players.$.prize": round(totalPrize * 0.2),
        },
      }
    );
    await Game.updateOne(
      { _id: game._id, "players.user": third.user },
      {
        $set: {
          "players.$.rank": 3,
          "players.$.prize": round(totalPrize * 0.1),
        },
      }
    );
  }
}

export async function changeStatus(gameId: string) {
  const game = await Game.findById(gameId);
  const shouldStart =
    game.startTime <= moment().unix() &&
    game.endTime > moment().unix() &&
    game.players &&
    game.players.length >= 2;
  const shouldFinish =
    moment().unix() >= game.endTime && game.status !== "finished";

  if (shouldStart) {
    await Game.findByIdAndUpdate(game._id, {
      $set: {
        status: game.status != "started" ? "started" : game.status,
      },
    });
  }

  if (shouldFinish) {
    await Game.findByIdAndUpdate(game._id, {
      $set: {
        status: game.status != "finished" ? "finished" : game.status,
      },
    });

    await getPrizes(game._id);
  }
}
