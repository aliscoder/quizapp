import { Container, Error, Loading } from "@components";
import React, { useEffect } from "react";
import GamePended from "./Components/GamePended";
import GameStarted from "./Components/GameStarted";
import { useGame } from "./hooks";



const Game = () => {
  const {isLoading , isError , game} = useGame()



  return isLoading ? (
    <Loading />
  ) : isError || !game ? (
    <Error />
  ) : (
    <Container hasBack={game.status !== 'start'}>
      {game.status == "before" && <GamePended/>}
      {game.status == "start" && <GameStarted game={game} />}
      {/* {game.status == "start" && <></>} */}
      {/* {game.status == "after"  &&  <GameFinished />} */}
    </Container>
  );
};

export default Game;
