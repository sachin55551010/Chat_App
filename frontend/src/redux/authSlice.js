import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth_slice",
  initialState: {
    authUser: null,
    socket: null,
    isPreviewImg: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setIsPreview: (state, action) => {
      state.isPreviewImg = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },

    clearAuthUser: (state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      state.authUser = null;
      state.socket = null;
    },
  },
});

export const { setAuthUser, clearAuthUser, setIsPreview } = authSlice.actions;
export default authSlice.reducer;
