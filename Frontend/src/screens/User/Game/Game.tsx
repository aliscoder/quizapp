import { Container, Error, Loading } from "@components";
import React from "react";
import { useGame } from "./hooks";
import GamePended from "./Components/GamePended";
import GameStarted from "./Components/GameStarted";
import GameFinished from "./Components/GameFinished";

const Game = () => {
  const { isLoading, isError, game, isPlayerDone } = useGame();

  return isLoading ? (
    <Loading />
  ) : isError || !game ? (
    <Error />
  ) : (
    <Container hasBack={game.status !== "started" || isPlayerDone}>
      {game.status === "waiting" && <GamePended game={game} />}
      {game.status === "started" && !isPlayerDone && <GameStarted game={game} />}
      {(game.status === "finished" || isPlayerDone) && <GameFinished game={game} />}
    </Container>
  );
};

export default Game;
