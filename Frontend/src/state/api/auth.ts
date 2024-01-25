import { AuthReturnType, UserInterface } from "@types";
import Api from ".";

export interface RegisterFormInterface {
  phone: string;
  username: string;
  password: string;
  repassword: string;
  enteredCode: string;
}

export interface LoginFormInterface {
  phone: string;
  enteredCode: string;
  password: string;
}

const authApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    REFRESH AUTH TOKEN
    */

    refreshToken: builder.mutation<AuthReturnType, string>({
      query: (id) => ({
        url: "/auth/refresh_token",
        method: "POST",
        body: { id },
      }),
    }),

    /*
    SEND VERIFICATION CODE
    */

    checkPhoneExistance: builder.mutation<
      { status: "register" | "login" },
      { phone: string }
    >({
      query: (body) => ({
        url: "/auth/send_code",
        method: "POST",
        body,
      }),
    }),

    /*
    LOGIN USER
    */

    login: builder.mutation<AuthReturnType, LoginFormInterface>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    /*
    REGISTER USER
    */

    register: builder.mutation<AuthReturnType, Partial<RegisterFormInterface>>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    /*
    GET COIN
    */

    getCoin: builder.query<{coin: number}, {userId:string}>({
      query: ({userId}) => ({
        url: `/auth/get_coin/${userId}`,
        method: "GET",
    
      }),
      providesTags: ['Coin']
    }),

    

    /*
    CHANGE PASSWORD
    */

    changePass: builder.mutation<
      { userId: string; newPassword: string; currentPassword: string },
      any
    >({
      query: (body) => ({
        url: "/auth/changePass",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoginMutation,
  useRegisterMutation,
  useCheckPhoneExistanceMutation,
  useChangePassMutation,
  useGetCoinQuery
} = authApi;

export default authApi;
