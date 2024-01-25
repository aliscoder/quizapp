import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeBottomTabOprions } from "./utils/options";
import Home from "@screens/User/Home/Home";
import { FinancialStackParamList, UserBottomTabParamList, UserStackParamList } from "./utils/types";
import Game from "@screens/User/Game/Game";
import Deposit from "@screens/User/Financial/Deposit/Deposit";
import Profile from "@screens/User/Profile/Profile";
import GameProvider from "@screens/User/Game/GameProvider";
import Cashout from "@screens/User/Financial/Cashout/Cashout";
import Transaction from "@screens/User/Financial/Transaction/Transaction";
import Credit from "@screens/User/Financial/Credit/Credit";
import Entry from "@screens/User/Financial/Entry/Entry";



const UserStack = createNativeStackNavigator<UserStackParamList>();
const FinancialStack = createNativeStackNavigator<FinancialStackParamList>();
const BottomTab = createBottomTabNavigator<UserBottomTabParamList>();

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={HomeBottomTabOprions}
    >
      <BottomTab.Screen name="Financial" component={FinancialNavigator} />
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="Main" component={BottomTabStack} />
      <UserStack.Screen name="Game" component={GameProvider} />
      <UserStack.Screen name="Deposit" component={Deposit} />
    </UserStack.Navigator>
  );
};

const FinancialNavigator = () => {
  return (
    <FinancialStack.Navigator screenOptions={{ headerShown: false }}>
      <FinancialStack.Screen name="Entry" component={Entry} />
      <FinancialStack.Screen name="Deposit" component={Deposit} />
      <FinancialStack.Screen name="Cashout" component={Cashout} />
      <FinancialStack.Screen name="Transaction" component={Transaction} />
      <FinancialStack.Screen name="Credit" component={Credit} />
    </FinancialStack.Navigator>
  );
};


export default UserNavigator;
