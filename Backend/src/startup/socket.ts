import { Server } from "http";
import moment from "jalali-moment";
import { Socket, Server as SocketServer } from "socket.io";

export default (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: process.env.SITE_URL,
    },
  });

  io.on("connection", (socket: Socket) => {
    // join game
    socket.on("join-game", ({ game }: { game: string }) => {
      socket.join(game);
    });

    // leave game
    socket.on("leave-game", ({ game }: { game: string }) => {
      socket.leave(game);
    });

    // send message and callback to frontend
    socket.on(
      "send-message",
      () => {}
      // async ({ chat, room }: { chat: ChatType; room: string }) => {
      //   const appointment = await Appointment.findById(room);
      //   appointment.chat.push(chat);
      //   await appointment.save();
      //   socket.broadcast.to(room).emit("broadcast-message", chat);
      // }
    );
  });
};
