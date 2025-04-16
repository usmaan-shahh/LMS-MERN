import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;

//The store is where the entire application state is held, but the state is organized into smaller, more manageable parts called slices.