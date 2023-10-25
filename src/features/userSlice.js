import { createSlice } from "@reduxjs/toolkit";

const data = {
  accessToken: null,
  id: false,
  name: "",
  loginName: "",
  role: "",
  isBlock: false,
};

function addSession(value) {
  sessionStorage.setItem("user", JSON.stringify(value));
}

function removeSession() {
  sessionStorage.removeItem("user");
}

function getSession() {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return data;
}

const initialState = getSession();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload: data }) => {
      state.accessToken = data.accessToken;
      state.id = data.id;
      state.name = data.name;
      state.loginName = data.loginName;
      state.role = data.role;
      state.isBlock = data.isBlock;

      addSession({
        accessToken: data.accessToken,
        id: data.id,
        name: data.name,
        loginName: data.loginName,
        role: data.role,
        isBlock: data.isBlock,
      });
    },
    logOff: (state) => {
      removeSession();
      state.id = false;
      state.accessToken = null;
    },
  },
});

export const { setUser, logOff } = userSlice.actions;
export default userSlice.reducer;
