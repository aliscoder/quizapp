import { Container, Error, Loading } from "@components";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { useGetGamePlayersQuery, useGetGameQuery } from "@state/api/game";
import { GameRouteProp } from "@navigation/utils/types";
import GamePended from "./Components/GamePended";
import GameStarted from "./Components/GameStarted";
import GameFinished from "./Components/GameFinished";

const Game = () => {
  const { params } = useRoute<GameRouteProp>();
  const { gameId: id } = params;
  const { data: game, isLoading, isError } = useGetGameQuery(id, { pollingInterval: 3000 });

  return isLoading ? (
    <Loading />
  ) : isError || !game ? (
    <Error />
  ) : (
    <Container hasBack>
      {game.status == "before" && <GamePended game={game} />}
      {game.status == "start" && <GameStarted game={game} />}
      {/* {status == "after"  &&  <GameFinished game={game}   />} */}
    </Container>
  );
};

export default Game;
