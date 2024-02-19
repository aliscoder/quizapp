import { FinancialInterface } from "@types";
import Api from ".";

const depositApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation<{ url: string }, { amount: number; userId: string }>({
      query: (body) => ({
        url: "/financial/deposit",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Financial'],

    }),
    cashout: builder.mutation<any, { amount: number; userId: string }>({
      query: (body) => ({
        url: "/financial/cashout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AuthUser", 'Financial'],
    }),
    financials: builder.query<FinancialInterface[], string>({
      query: (userId) => ({
        url: `/financial/${userId}`,
        method: "GET",
      }),
      providesTags: ['Financial']
    }),
    completeAccount: builder.mutation<any, {card: string , sheba:string,owner:string}>({
      query: (body) => ({
        url: `/financial/complete-account`,
        method: "POST",
        body
      }),
      invalidatesTags: ['AuthUser']
    }),
  }),
});

export const { useDepositMutation, useCashoutMutation, useFinancialsQuery, useCompleteAccountMutation } = depositApi;

export default depositApi;
