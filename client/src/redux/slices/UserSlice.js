import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

const initialState = {
  user: undefined,
  isLoading:false
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = undefined;

      deleteCookie("token");
      deleteCookie("role");
    },
    setLoading:(state, action) => {
      state.isLoading = action.payload
    }
  },
});

export const { setUser,logout,setLoading } = UserSlice.actions;

export default UserSlice.reducer;
