import { Container } from "@components";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { memo } from "react";
import { Dimensions } from "react-native";

import Games from "./components/Games";

const HomeTopTab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <Container>
      <HomeTopTab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        initialRouteName="All"
        screenOptions={HomeGameTopTabOptions}
      >
        <HomeTopTab.Screen
          name="All"
          options={{ title: "همه مسابقه ها" }}
          children={() => <Games />}
         
        />
        <HomeTopTab.Screen
          options={{ title: "مسابقه های من" }}
          name="Mine"
          children={() => <Games meOnly />}
        />
      </HomeTopTab.Navigator>
    </Container>
  );
};

export default memo(Home);
