import express from "express";
import {
  getAllGames,
  answerQuestion,
  getGame,
  registerGame,
  changeGameStatus,
} from "../controllers/game";

const gameRouter = express.Router();

gameRouter.get("/user/:userId", getAllGames);
gameRouter.get("/:userId/:gameId", getGame);
gameRouter.post("/:id/answer", answerQuestion);
gameRouter.post("/:gameId/change-status", changeGameStatus);
gameRouter.post("/register_game", registerGame);

export default gameRouter;
