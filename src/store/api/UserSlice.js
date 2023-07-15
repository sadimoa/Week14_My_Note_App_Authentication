import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BASE_URL from "./BaseUrl";

const getToken = () => {
  return Cookies.get("token");
};

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
      // get user
      getUser: builder.query({
        query: () => {
          return {
            url: "user",
            method: "GET",
          };
        },
      }),
  }),
});

export const { useGetUserQuery } = userSlice;

export default userSlice.reducer;
