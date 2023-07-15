import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BASE_URL from "./BaseUrl";

const setTokenCookie = (token) => {
  Cookies.set("token", token, { expires: 1 });
};

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    // Register User
    register: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // login
    login: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
      onQueryStarted: async (arg, { queryFulfilled }) => {
            try {
                const result = await queryFulfilled;
                setTokenCookie(result.data.token);
            } catch (error) {
                console.log(error);
            }
        },
    }),

  }),
});

export const { useRegisterMutation, useLoginMutation } = authSlice;

export default authSlice.reducer;