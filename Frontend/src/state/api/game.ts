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
    getGame: builder.query<GameInterface, {gameId: string , userId:string}>({
      query: ({gameId, userId}) => ({
        url: `/games/${userId}/${gameId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

     /*
    REGISTER USER IN GAME
    */
    registerUserInGame: builder.mutation< { game: GameInterface; user: UserInterface }, { gameId: string; userId: string }>({
      query: (body) => ({
        url: "/games/register_game",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Games", 'Coin'],
    }),

    /*
    ANSWER QUESTION
    */
    answerQuestion: builder.mutation<any, { gameId: string; playerId: string; qId?: string; answer?: number }>({
      query: (body) => ({
        url: `/games/${body.gameId}/answer`,
        method: "POST",
        body,
      }),
    }),

   
  }),
});

export const {
  useRegisterUserInGameMutation,
  useGetAllGamesQuery,
  useGetGameQuery,
  useAnswerQuestionMutation,
} = clientApi;

export default clientApi;
