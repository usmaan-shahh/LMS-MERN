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
    // Check for Token cookie before making the request
    const hasTokenCookie = document.cookie.includes("Token");
    if (!hasTokenCookie) {
      return null; // Don't make API call if no token exists
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
