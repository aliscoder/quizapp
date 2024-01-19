import { Server, Socket } from "socket.io";
import { HTTPserver } from "./server";

const io = new Server(HTTPserver);

io.on("connection", (socket: Socket) => {
  console.log(`${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
