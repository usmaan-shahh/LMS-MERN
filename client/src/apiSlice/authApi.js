import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../slices/authSlice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user/",
    credentials: "include", //“Include cookies with this request, even though it’s going to a different domain/port.”
    }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),

    fetchUserProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
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
          const result = await queryFulfilled;
          const { email, password } = result.data.newUser;
          dispatch(userLoggedIn({ email, password }));
        } catch (error) {
          console.error("Error logging in user:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useFetchUserProfileQuery,
} = authApi;
export default authApi;
