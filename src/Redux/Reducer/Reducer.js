import { createSlice } from "@reduxjs/toolkit";
// console.log(localStorage.getItem("login"));

const getlogin = () => {
  if (localStorage.getItem("login") == "false") {
    return false;
  } else if (localStorage.getItem("login") == null) {
    return false;
  } else {
    return true;
  }
};

export const loginSlice = createSlice({
  name: "loginhandle",
  initialState: {
    isLogin: getlogin(),
    isSetup: localStorage.getItem("setup"),
    role: 1,
  },
  reducers: {
    login: (state) => {
      state.isLogin = !state.isLogin;
      localStorage.setItem("login", state.isLogin);
    },
    setupdb: (state, value) => {
      state.isSetup = value.payload;
      localStorage.setItem("setup", value.payload);
    },
    role: (state, value) => {
      state.role = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, setupdb, role } = loginSlice.actions;

export default loginSlice.reducer;
