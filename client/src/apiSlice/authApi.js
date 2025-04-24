import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../slices/authSlice";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user/",
    credentials: "include", //"Include cookies with this request, even though it's going to a different domain/port."
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            // Fetch user profile immediately after successful login
            const profileResult = await dispatch(
              authApi.endpoints.fetchUserProfile.initiate()
            ).unwrap();
            dispatch(userLoggedIn(profileResult.user));
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.error("Error logging out user:", error);
        }
      },
    }),

    fetchUserProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn(result.data.user));
        } catch (error) {
          console.error("Error logging in user:", error);
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (inputData) => ({
        url: "update/profile",
        method: "PUT",
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

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useFetchUserProfileQuery,
  useUpdateProfileMutation,
} = authApi;
export default authApi;
