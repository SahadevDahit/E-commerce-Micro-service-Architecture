import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  // Add any additional authentication-related state properties here
};

const initialState: AuthState = {
  isAuthenticated: true,
  // Initialize additional state properties here
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state) => {
      state.isAuthenticated = true;
      console.log("sign in function called");
    },
    signup: (state) => {
      console.log("sign up function called");
      state.isAuthenticated = false;
    },
  },
});

export const { signin, signup } = authSlice.actions;
export default authSlice.reducer;
