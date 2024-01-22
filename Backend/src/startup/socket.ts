import { Server } from "http";
import { Socket, Server as SocketServer } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Game from "../models/Game";
import moment from "jalali-moment";

const socket = (io: SocketServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  

  io.on("connection", (socket: Socket) => {
    socket.on("join-game", ({ game }: { game: string }) => {
      socket.join(game);
    });

    socket.on("leave-game", ({ game }: { game: string }) => {
      socket.leave(game);
    });

    // socket.on('check', async ({gameId}) => {
    //   const game = await Game.findById(gameId);

    //   const checkInterval = setInterval(async () => {
    //     if (moment().unix() > game.endTime) {
    //       await Game.findByIdAndUpdate(game._id, {
    //         $set: { status: "after" },
    //       });
    //       clearInterval(checkInterval)
    //       io.to(gameId).emit('checked', {status: game.status})
    //     } else if (
    //       game.startTime <= moment().unix() &&
    //       game.endTime >= moment().unix()
    //     ) {
    //       if (game.players && game.players.length >= 2) {
    //         await Game.findByIdAndUpdate(game._id, {
    //           $set: { status: "start" },
    //         });
    //         clearInterval(checkInterval)
    //         io.to(gameId).emit('checked', {status: game.status})
    //       } else {
    //         await Game.findByIdAndUpdate(game._id, {
    //           $set: { status: "after" },
    //         });
    //         clearInterval(checkInterval)
    //         io.to(gameId).emit('checked', {status: game.status})
    //       }
    //     }
    //   }, 1000)

      
    // })

  });
};


export default socket
