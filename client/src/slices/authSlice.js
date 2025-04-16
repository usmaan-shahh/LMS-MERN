import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;

// The reducer is a pure function, meaning it does not have side effects and does not modify the state directly. Instead, it returns a new state object with the updated values.

// Each slice has its own initial state, actions, and reducer. This allows you to break down your Redux store into smaller, more manageable pieces, making it easier to maintain and scale your application.

// The createSlice function automatically generates action creators and action types based on the slice name and the reducer functions you define. This means you don't have to manually create action types and action creators, which can save you a lot of boilerplate code.
