import { List } from "@components";
import { memo, useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import useGames from "../hooks/useGames";
import { GameInterface } from "@types";
import GameCard from "../../Components/GameCard";
import RegisterModal from "./RegisterModal";
import { useNavigation } from "@react-navigation/core";
import { UserScreenNavigationProp } from "@navigation/utils/types";
import { useAuth } from "@hooks";

const Games = ({ meOnly }: { meOnly?: boolean }) => {
  const { navigate } = useNavigation<UserScreenNavigationProp>();
  const { isLoading, data: games, isError, refetch } = useGames();
  

  const [isOpen , setIsOpen] = useState(false);
  const [selectedGame , setSelectedGame] = useState<GameInterface>()
  const {user} = useAuth()

  const GAMES = useMemo(() => {
    return meOnly ? games?.mine : games?.all.slice(0, 20);
  }, [games]);


  const isMine = (game: GameInterface) => {
    return game?.players?.map((player) => player.user._id).includes(user._id)
  }


  

  const renderGame = useCallback(({ item }: { item: GameInterface }) => {
    return <GameCard game={item} onCardAction={checkGameRegisteration} isMine = {isMine(item)} />;
  },[]);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev)
  },[isOpen])

  const checkGameRegisteration = useCallback((game: GameInterface) => {
    
    if (isMine(game)) {
      navigate("Game", { gameId: game._id });
    } else {
      setSelectedGame(game)
      toggleModal()
    }
  }, [selectedGame])

  const Refresher = useMemo(() => <RefreshControl refreshing={isLoading} onRefresh={refetch} /> , []) 
  

  return (
    <>
      <List
        isPerformant
        estimatedItemSize={20}
        //@ts-ignore
        renderItem={renderGame}
        data={GAMES}
        isLoading={isLoading}
        isError={isError}
        refreshControl={Refresher}
      />
      <RegisterModal isOpen={isOpen} toggleModal={toggleModal} game={selectedGame}  />
    </>
  );
};

export default memo(Games);
