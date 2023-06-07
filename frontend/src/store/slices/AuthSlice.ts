import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { token: string | null } = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    insertToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    deleteToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { insertToken, deleteToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
