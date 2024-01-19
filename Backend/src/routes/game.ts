import express from "express";
import {
  getAllGames,
  seedGames,
  gamePlayerList,
  answerQuestion,
  getGame,
  registerGame,
  startGame,
  changeGameStatus,
} from "../controllers/game";
import { setGames } from "../crons";

const gameRouter = express.Router();

gameRouter.get("/user/:userId", getAllGames);
gameRouter.get("/:id", getGame);
gameRouter.get("/:id/players", gamePlayerList);
gameRouter.post("/:id/start", startGame);
gameRouter.post("/:id/answer", answerQuestion);
gameRouter.post("/register_game", registerGame);
gameRouter.post("/change_status", changeGameStatus);

// gameRouter.post("/seed", seedGames);
// gameRouter.post("/setGames", setGames);

export default gameRouter;
