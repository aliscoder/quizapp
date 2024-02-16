import { useAuth } from "@hooks";
import { GameRouteProp } from "@navigation/utils/types";
import { useRoute } from "@react-navigation/core";
import { useGetGameQuery } from "@state/api/game";

export const useGame = () => {
  const { params } = useRoute<GameRouteProp>();
  const { user } = useAuth();
  const { data: game, isLoading, isError, isSuccess } = useGetGameQuery({ userId: user._id, gameId: params.gameId });

  const player = game?.players.find((player) => player.user._id == user._id);
  const isPlayerDone = player?.status == "finished";

  return {
    game,
    isLoading,
    isError,
    isSuccess,
    isPlayerDone,
  };
};
