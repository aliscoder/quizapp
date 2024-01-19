import { useTheme } from "native-base";
import React from "react";
// import { Image as CacheImage } from "react-native-expo-image-cache";
import { Image as ExpoImage } from "expo-image";

type Props = {
  uri: string;
  size?: number;
  radius?: number;
  border?: boolean;
};
const Image: React.FC<Props> = ({ uri, radius = 0, border = false, size = 200 }) => {
  const theme = useTheme();
  // const {Placeholder} = usePhoto
  return (
    <ExpoImage
      style={{
        width: size ,
        height: size ,
        marginHorizontal: 5,
        borderRadius: radius,
        borderColor: border ? theme.colors.border.muted : "transparent",
        borderWidth: border ? 1 : 0,
      }}
      source={{ uri }}
    />
  );
};

export default Image;
