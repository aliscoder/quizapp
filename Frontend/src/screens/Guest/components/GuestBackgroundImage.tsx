import { Base } from "@utils";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const GuestBackgroundImage = ({ height = 600 }: { height?: number }) => {
  const theme = useTheme();
  return (
    <ImageBackground source={Base} style={{ width: "100%", height }}>
      <LinearGradient
        colors={[theme.colors.primary, "transparent"]}
        style={styles.gradBottom}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <LinearGradient
        colors={[theme.colors.primary, "transparent"]}
        style={styles.gradTop}
        start={{ x: 1.0, y: 0 }}
        end={{ x: 1.0, y: 1.0 }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  gradTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "40%",
  },
});

export default GuestBackgroundImage;
