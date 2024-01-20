import { Socket } from "socket.io"
import { rootIO } from "../server"

export function test() {
    rootIO.on('connection', function(socket){
        socket.join('65ab61977a7a06477695949c');
        rootIO.to('65ab61977a7a06477695949c').emit('changed')
      });
}