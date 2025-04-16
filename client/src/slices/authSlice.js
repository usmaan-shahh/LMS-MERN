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

// The createSlice function automatically generates action creators and action types based on the slice name and the reducer functions you define. This means you don't have to manually create action types and action creators, which can save you a lot of boilerplate code.

// Redux Toolkit automatically creates action creators for the reducers you define. The action creator for increment will look like this:
// function increment() {
//   return { type: "counter/increment",  payload: optionalData };
// }

// Action Object is a plain object that describes what happened	{ type: 'counter/increment' }
