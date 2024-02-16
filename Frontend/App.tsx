import { useInitialAssets } from "@hooks";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Provider } from "react-redux";
import Entrance from "./Entrance";
import store from "./src/state/store";
import "./src/styles.css";
import { deleteItemAsync } from "expo-secure-store";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontLoaded } = useInitialAssets();

  

  return <Provider store={store}>{fontLoaded && <Entrance />}</Provider>;
}
