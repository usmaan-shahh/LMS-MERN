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
const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.fetchUserProfile.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
export default store;
