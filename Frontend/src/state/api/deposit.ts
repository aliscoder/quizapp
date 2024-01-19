import Api from ".";


const depositApi = Api.injectEndpoints({
    endpoints: (builder) => ({


        deposit: builder.mutation<{ url: string }, { amount: number, userId: string }>({
            query: (body) => ({
                url: "/deposit",
                method: "POST",
                body,
            }),
        }),


    }),
});

export const {
    useDepositMutation
} = depositApi;

export default depositApi;
