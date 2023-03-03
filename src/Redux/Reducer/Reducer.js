import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginhandle",
  initialState: {
    status: false,
  },
  reducers: {
    login: (state, check) => {
      console.log(check.payload);
      state.status = !state.status;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = loginSlice.actions;

export default loginSlice.reducer;
