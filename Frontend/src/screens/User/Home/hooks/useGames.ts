import { useAuth } from "@hooks";
import { useGetAllGamesQuery } from "@state/api/game";

const useGames = () => {
    const { user } = useAuth();
    const data = useGetAllGamesQuery({ userId: user._id });
    return data;
  };

  
  export default useGames