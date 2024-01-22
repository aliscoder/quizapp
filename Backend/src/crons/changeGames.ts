import moment from "jalali-moment";
import Game from "../models/Game";
import { round } from "lodash";
import User from "../models/User";

export const finishGame = async (gameId : string) => {

  
  
  
  const game = await Game.findOne({_id: gameId})
  await Game.findOneAndUpdate({_id: gameId} , {$set: {status: 'archive'}}, {new: true})

  
  
  
  

    const sorted = game.players.sort((a, b) => b.point - a.point);
    const totalPrize = game.players.length * game.type; // 10 * 50000 = 500000

    const first = sorted[0]; // {user : string , point: 15 , ....}
    const second = sorted[1];
    const third = sorted[2];


    if (game.players.length <= 4) {
      await User.findOneAndUpdate(
        { _id: first.user },
        { $inc: { coin: round(totalPrize * 0.8) } }
      );
      await Game.updateOne(
        { "players.user": first.user },
        {
          $set: {
            "players.$.rank": 1,
            "player.$.prize": round(totalPrize * 0.8),
          },
        }
      );
    } else if (game.players.length > 4 && game.players.length <= 8) {
      // 60% first , 20% second
      await User.findOneAndUpdate(
        { _id: first.user },
        { $inc: { coin: round(totalPrize * 0.6) } }
      );
      await User.findOneAndUpdate(
        { _id: second.user },
        { $inc: { coin: round(totalPrize * 0.2) } }
      );
      await Game.updateOne(
        { "players.user": first.user },
        {
          $set: {
            "players.$.rank": 1,
            "player.$.prize": round(totalPrize * 0.6),
          },
        }
      );
      await Game.updateOne(
        { "players.user": second.user },
        {
          $set: {
            "players.$.rank": 2,
            "player.$.prize": round(totalPrize * 0.2),
          },
        }
      );
    } else {
      // 50% first , 20% second , 10% third

      await User.findOneAndUpdate(
        { _id: first.user },
        { $inc: { coin: round(totalPrize * 0.5) } }
      );
      await User.findOneAndUpdate(
        { _id: second.user },
        { $inc: { coin: round(totalPrize * 0.2) } }
      );
      await User.findOneAndUpdate(
        { _id: third.user },
        { $inc: { coin: round(totalPrize * 0.1) } }
      );
      await Game.updateOne(
        { "players.user": first.user },
        {
          $set: {
            "players.$.rank": 1,
            "player.$.prize": round(totalPrize * 0.5),
          },
        }
      );
      await Game.updateOne(
        { "players.user": second.user },
        {
          $set: {
            "players.$.rank": 2,
            "player.$.prize": round(totalPrize * 0.2),
          },
        }
      );
      await Game.updateOne(
        { "players.user": third.user },
        {
          $set: {
            "players.$.rank": 3,
            "player.$.prize": round(totalPrize * 0.1),
          },
        }
      );
    }
  


};


export async function changeGames() {

  
  
  const games = await Game.find();
 
  
  games.forEach(async (game) => {

    console.log('game ->' , game.status)

    // if(game.status !== 'archive') {
      
    //   if (moment().unix() > game.endTime) {

    //   // await Game.findByIdAndUpdate(game._id, {
    //   //     $set: { status: "after" },
    //   //   });

    //   console.log('game -> ' , game.status , game._id)

    //   finishGame(game._id)
    // } else if (
    //   game.startTime <= moment().unix() &&
    //   game.endTime >= moment().unix()
    // ) {
    //   if (game.players && game.players.length >= 2) {
    //     await Game.findByIdAndUpdate(game._id, {
    //       $set: { status: "start" },
    //     });
    //   }
    // }
    // }
    
  });
}
