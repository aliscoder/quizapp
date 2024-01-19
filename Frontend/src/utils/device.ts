import { Dimensions, Platform } from "react-native";

export default {
  width: Platform.OS === "web" ? Dimensions.get("window").width : Dimensions.get("screen").width,
  height: Platform.OS === "web" ? Dimensions.get("window").height : Dimensions.get("screen").height,
};
