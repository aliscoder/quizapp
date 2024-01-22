import express from "express";
import {
  getAllGames,
  seedGames,
  answerQuestion,
  getGame,
  registerGame,
} from "../controllers/game";

const gameRouter = express.Router();

gameRouter.get("/user/:userId", getAllGames);
gameRouter.get("/:userId/:gameId", getGame);
gameRouter.post("/:id/answer", answerQuestion);
gameRouter.post("/register_game", registerGame);

// gameRouter.post("/seed", seedGames);
// gameRouter.post("/setGames", setGames);

export default gameRouter;
