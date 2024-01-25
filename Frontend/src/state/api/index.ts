import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemAsync } from "expo-secure-store";
import { Platform } from "react-native";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://quiz.iran.liara.run",
  prepareHeaders: async (headers) => {
    let token =
      Platform.OS === "web"
        ? localStorage.getItem("token")
        : await getItemAsync("token");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const Api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Games" , 'Coin'],
});

export default Api;
