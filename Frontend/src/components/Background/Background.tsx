import { useTheme } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";

type Props = {
  imageURL?: string;
  placholder?: any;
  preview?: string;
  size?: number | string;
  children: any;
  style?: any;
  imageOpacity?: number;
};
const Background: React.FC<Props> = ({
  size = 200,
  placholder,
  imageOpacity = 0.5,
  preview,
  imageURL,
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <ImageBackground
      source={
        preview
          ? { uri: `data:image/jpeg;base64,${preview}` }
          : placholder
          ? placholder
          : { uri: imageURL }
      }
      style={[
        {
          width: size,
          overflow: "hidden",
          height: size,
          borderWidth: 0.2,
          borderColor: theme.colors.border.muted,
          borderRadius: 5,
        },
        style,
      ]}
      imageStyle={{ opacity: imageOpacity }}
    >
      {children}
    </ImageBackground>
  );
};

export default Background;
