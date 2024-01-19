import { useRefreshTokenMutation } from "@state/api/auth";
import { loginUser, logoutUser, updateUser } from "@state/reducers/authReducer";
import { authSelector } from "@state/selectors/authSelector";
import { deleteItem, getItem, setItem } from "@utils";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect } from "react";
import { AuthReturnType, DecodedTokenType, UserInterface } from "../types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export default function useAuth() {
  const { theme, user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [refreshToken, { data: updatedData, isSuccess: tokenRefreshed }] =
    useRefreshTokenMutation();

  const checkInitailAuth = useCallback(async (callback?: Function) => {
    const token = await getItem("token");
    const decoded = token ? jwtDecode<DecodedTokenType>(token) : null;
    if (decoded) {
      refreshToken(decoded.userId).then((data) => {
        if (data) {
          //@ts-ignore
          dispatch(loginUser(data.data.user));
          if (callback) {
            callback();
          }
        }
      });
    } else {
      if (callback) {
        callback();
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await deleteItem("token");
    dispatch(logoutUser());
  }, []);

  const authenticate = useCallback(async ({ token, user }: AuthReturnType) => {
    await setItem("token", token);
    dispatch(loginUser(user));
  }, []);

  const updateToken = useCallback(async (data: AuthReturnType) => {
    await setItem("token", data.token);

    dispatch(updateUser(data.user));
  }, []);

  useEffect(() => {
    if (updatedData) {
      updateToken(updatedData);
    }
  }, [tokenRefreshed, updatedData]);

  return {
    theme,
    logout,
    checkInitailAuth,
    authenticate,
    user: user as UserInterface,
  };
}
