import React from "react";
import { useAuth } from "../hooks";
import GuestNavigator from "./GuestNavigator";
import UserNavigator from "./UserNavigator";

const AppNavigator = () => {
  const { user } = useAuth();

  return user ? <UserNavigator /> : <GuestNavigator />;
};

export default AppNavigator;
