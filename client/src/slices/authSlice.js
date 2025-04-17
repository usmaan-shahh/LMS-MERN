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

    // Redux Toolkit automatically creates action creators for the reducers you define. The action creator for userLoggedIn will look like this:
    // function userLoggedIn(user) {
    //   return { type: "authSlice/userLoggedIn", payload: { user } };
    // }

    userLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;

//When you call dispatch(...), the action creator is called.

//The action creator returns the action object.

//Redux uses the type to run the correct reducer function.

//The reducer updates the Redux state.
