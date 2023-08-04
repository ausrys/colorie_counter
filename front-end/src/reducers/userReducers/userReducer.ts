import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const userInfo = action.payload;
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    logOutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
export const { setUser, logOutUser } = userReducer.actions;
export default userReducer.reducer;
