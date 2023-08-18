import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, refreshToken, accessToken } = action.payload;
      state.user = user;
      state.refreshToken = refreshToken;
      state.accesstoken = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.refreshToken = null;
      state.accesstoken = null;

    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

//@ts-ignore
export const selectCurrentUser = (state) => state.auth.user;
//@ts-ignore
export const selectCurrentToken = (state) => state.auth.accessToken;
