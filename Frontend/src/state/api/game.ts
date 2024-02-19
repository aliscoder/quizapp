import { GameInterface, GameStatus, PlayerInterface, QuestionInterface, UserInterface } from "@types";
import Api from ".";

const clientApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET ALL GAMES
    */
    getAllGames: builder.query<{ all: GameInterface[]; mine: GameInterface[] }, { userId: string }>({
      query: ({ userId }) => ({
        url: `/games/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Games"],
    }),

    /*
    GET SPECIFIC GAME
    */
    getGame: builder.query<GameInterface, { gameId: string; userId: string }>({
      query: ({ gameId, userId }) => ({
        url: `/games/${userId}/${gameId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Game"],
    }),

    /*
    REGISTER USER IN GAME
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
      invalidatesTags: ["Games", "AuthUser"],
    }),

    /*
    ANSWER QUESTION
    */
    answerQuestion: builder.mutation<
      QuestionInterface,
      { gameId: string; playerId: string; qId?: string; answer?: number }
    >({
      query: (body) => ({
        url: `/games/${body.gameId}/answer`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Game"],
    }),

    /*
    ANSWER QUESTION
    */
    changeGameStatus: builder.mutation<any, { gameId: string }>({
      query: (body) => ({
        url: `/games/${body.gameId}/change-status`,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Game" , 'AuthUser'],
    }),
  }),
});

export const {
  useRegisterUserInGameMutation,
  useGetAllGamesQuery,
  useGetGameQuery,
  useAnswerQuestionMutation,
  useChangeGameStatusMutation,
} = clientApi;

export default clientApi;
