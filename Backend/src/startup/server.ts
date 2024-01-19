import { Server } from "http";
import { PORT } from "../data";

export default (server: Server) => {
  server.listen(PORT, () =>
    console.log(`Server started on port : ${PORT}`)
  );
};
