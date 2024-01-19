import React from "react";
import { Icon, Pressable, View } from "native-base";
import Animation from "../Animation/Animation";
import { Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  full?: boolean;
  name?: any;
  title?: string;
  onRefresh?: () => void;
}
const ListAnimation: React.FC<Props> = ({ full = false, name, title, onRefresh }) => {
  return (
    <View
      flex={1}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      top={0}
      right={0}
      bottom={0}
      left={0}
      background={full ? "primary" : "transparent"}
    >
      <Animation size={80} name={name} />
      {title && (
        <Text mt={2} fontFamily="YekanBold" color="text.main" fontSize="md">
          {title}
        </Text>
      )}

      {onRefresh && (
        <Pressable mt={4} onPress={onRefresh}>
          <Icon as={Ionicons} name="ios-refresh-circle-outline" size="2xl" color="white" />
        </Pressable>
      )}
    </View>
  );
};

export default ListAnimation;
