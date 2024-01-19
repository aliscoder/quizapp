import { GameInterface, PlayerInterface, UserInterface } from "@types";
import Api from ".";

const clientApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET ALL GAMES
    */
    getAllGames: builder.query<{all: GameInterface[], mine: GameInterface[]}, {userId: string}>({
      query: ({userId}) => ({
        url: `/games/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Games"],

    }),

    /*
    GET SPECIFIC GAME
    */
    getGame: builder.query<GameInterface, string>({
      query: (gameId) => ({
        url: `/games/${gameId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0
    }),

    /*
    GET GAME PLAYERS
    */
    getGamePlayers: builder.query<PlayerInterface[], string>({
      query: (gameId) => ({
        url: `/games/${gameId}/players`,
        method: "GET",
      }),
    }),

    /*
    CHANGE GAME STATUS
    */
    changeGameStatus: builder.mutation<
      any,
      { gameId: string; playerId: string; status: "before" | "after" | "start" }
    >({
      query: (body) => ({
        url: `/games/change_status`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Games"],
    }),

    /*
    ANSWER QUESTION
    */
    answerQuestion: builder.mutation<
      any,
      { gameId: string; playerId: string; qId?: string; answer?: number }
    >({
      query: (body) => ({
        url: `/games/${body.gameId}/answer`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Games"],
    }),

    /*
    UPDATE USER PROFILE
    */
    registerUserInGame: builder.mutation<
      { game: GameInterface; user: UserInterface },
      { gameId: string; userId: string }
    >({
      query: (body) => ({
        url: "/games/register_game",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Games"],
    }),
  }),
});

export const {
  useRegisterUserInGameMutation,
  useGetAllGamesQuery,
  useGetGameQuery,
  useGetGamePlayersQuery,
  useAnswerQuestionMutation,
  useChangeGameStatusMutation,
} = clientApi;

export default clientApi;
