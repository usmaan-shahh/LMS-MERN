import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({

  name: "authSlice",
  initialState,
  reducers: {
    
    // Hey Redux! I want to log in this user: { id: 1, name: 'Alice' }"
    // Redux Toolkit’s userLoggedIn action creator builds an action object:
    // Redux sends this action object to the reducer

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
