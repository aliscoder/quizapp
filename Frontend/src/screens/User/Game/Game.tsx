import { Container, Error, Loading } from "@components";
import React, { useCallback, useEffect, useState } from "react";
import GamePended from "./Components/GamePended";
import GameStarted from "./Components/GameStarted";
import { useGame } from "./hooks";
import { useAuth } from "@hooks";
import GameFinished from "./Components/GameFinished";



const Game = () => {
  const {isLoading , isError , game} = useGame()
  const {user} = useAuth()
  const [isPlayerDone , setPlayerDone] = useState(false)


  useEffect(() => {
    if(game){
      setPlayerDone(game.isPlayerDone)
    }
  }, [game])


 
  const finishGameForPlayer= useCallback(() => {
    setPlayerDone(true)
  }, [])

 


  return isLoading ? (
    <Loading />
  ) : isError || !game ? (
    <Error />
  ) : (
    <Container hasBack={game.status !== 'start' || isPlayerDone}>
      {!isPlayerDone && game.status == "before" && <GamePended game={game}/>}
      {!isPlayerDone && game.status == "start" && <GameStarted game={game} onFinish={finishGameForPlayer} />}
      {(isPlayerDone || game.status == "after" ) &&  <GameFinished game={game} />}
    </Container>
  );
};

export default Game;
