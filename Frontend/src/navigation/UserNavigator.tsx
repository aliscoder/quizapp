import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeBottomTabOprions } from "./utils/options";
import Home from "@screens/User/Home/Home";
import { UserBottomTabParamList, UserStackParamList } from "./utils/types";
import Game from "@screens/User/Game/Game";
import Deposit from "@screens/User/Deposit/Deposit";
import Profile from "@screens/User/Profile/Profile";



const UserStack = createNativeStackNavigator<UserStackParamList>();
const BottomTab = createBottomTabNavigator<UserBottomTabParamList>();

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={HomeBottomTabOprions}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="Main" component={BottomTabStack} />
      <UserStack.Screen name="Game" component={Game} />
      <UserStack.Screen name="Deposit" component={Deposit} />
    </UserStack.Navigator>
  );
};

export default UserNavigator;
