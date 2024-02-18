import { useInitialAssets, useStorage } from "@hooks";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Provider } from "react-redux";
import Entrance from "./Entrance";
import store from "./src/state/store";
import "./src/styles.css";

SplashScreen.preventAutoHideAsync();

process.env.TZ = "Asia/Tehran";

export default function App() {
  const { fontLoaded } = useInitialAssets();

  return <Provider store={store}>{fontLoaded && <Entrance />}</Provider>;
}
