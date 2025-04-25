import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import authApi from "../apiSlice/authApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Initialize authentication state
const initializeAuth = async () => {
  try {
    // Check if session cookie exists
    const hasSessionCookie = document.cookie.includes("connect.sid");
    if (!hasSessionCookie) {
      return null;
    }

    const result = await store
      .dispatch(authApi.endpoints.fetchUserProfile.initiate())
      .unwrap();
    return result;
  } catch (error) {
    console.error("Error initializing auth:", error);
    return null;
  }
};

export { store, initializeAuth };
