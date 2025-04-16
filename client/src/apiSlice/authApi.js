import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../slices/authSlice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
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

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { result } = await queryFulfilled; //queryFulfilled → a promise that resolves with the API response when the request finishes
          dispatch(userLoggedIn({ user: result.data.user })); //dispatching the userLoggedIn action with the user data from the response
        } catch (error) {
          console.error("Error logging in user:", error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
export default authApi;
