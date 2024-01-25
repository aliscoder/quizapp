import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type GuestStackParamList = {
  Phone: undefined;
  Register: {
    phone: string;
  };
  Login: {
    phone: string;
  };
};

export type GuestScreenNavigationProp =
  NativeStackNavigationProp<GuestStackParamList>;
export type RegisterScreenRouteProp = RouteProp<
  GuestStackParamList,
  "Register"
>;
export type LoginScreenRouteProp = RouteProp<GuestStackParamList, "Login">;

export type UserBottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Financial: undefined;
};

export type UserStackParamList = {
  Main: UserBottomTabParamList;
  Game: {
    gameId: string;
  };
  Deposit: any
};

export type FinancialStackParamList = {
  Deposit: undefined;
  Cashout: undefined;
  Transaction: undefined;
  Credit: undefined;
  Entry: undefined
};

export type UserScreenNavigationProp =
  NativeStackNavigationProp<UserStackParamList>;
  export type FinancialScreenNavigationProp =
  NativeStackNavigationProp<FinancialStackParamList>;
export type UserBottomTabNavigationProp =
  NativeStackNavigationProp<UserBottomTabParamList>;
export type GameRouteProp = RouteProp<UserStackParamList, "Game">;
// export type FinancialRouteProp = RouteProp<FinancialStackParamList, "Entry">;
export type UserBottomTabRouteProp = RouteProp<UserBottomTabParamList>;
