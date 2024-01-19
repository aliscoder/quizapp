import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, PhoneScreen, RegisterScreen } from "@screens/Guest";
import { GuestStackParamList } from "./utils/types";

const GuestStack = createNativeStackNavigator<GuestStackParamList>();

const GuestNavigator = () => {
  return (
    <GuestStack.Navigator screenOptions={{ headerShown: false }}>
      <GuestStack.Screen name="Phone" component={PhoneScreen} />
      <GuestStack.Screen name="Register" component={RegisterScreen} />
      <GuestStack.Screen name="Login" component={LoginScreen} />
    </GuestStack.Navigator>
  );
};

export default GuestNavigator;
