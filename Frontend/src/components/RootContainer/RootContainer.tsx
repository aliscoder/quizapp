import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: any;
}
const RootContainer: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <SafeAreaView style={styles.RootContainerStyle}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  RootContainerStyle: {
    backgroundColor: "snow",
    height: "100%",
    paddingHorizontal: 10,
  },
});

export default RootContainer;
