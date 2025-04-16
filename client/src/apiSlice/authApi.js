import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQuery";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
    }),
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterUserMutation } = authApi;
export default authApi;
