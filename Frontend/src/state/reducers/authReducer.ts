import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "@types";
import { theme } from "@utils";
import { ITheme } from "native-base";

export interface AuthProps {
  user: UserInterface | null;
  theme: ITheme;
}
const initialState: AuthProps = {
  user: null,
  theme: theme,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }: PayloadAction<UserInterface | null>) => {
      state.user = payload ? payload : null;
    },
    updateUser: (state, { payload }: PayloadAction<UserInterface>) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {},
});

export const { loginUser, logoutUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
