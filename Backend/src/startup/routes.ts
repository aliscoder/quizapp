import express, { Express } from "express";
import cors from "cors";
// import errorHandler from "../middlewares/error";
import gameRouter from "../routes/game";
import authRouter from "../routes/auth";
import depositRouter from "../routes/financial";
import questionRouter from "../routes/question";
import { seedGames } from "../controllers/seeder";


export default (app: Express) => {
  app.use(cors());
  app.use(express.static("public"));

  app.use("/games", gameRouter);
  app.use("/auth", authRouter);
  app.use("/financial", depositRouter);
  app.use("/question", questionRouter);

  app.get("/seed", seedGames);

  // app.use(errorHandler);
};
