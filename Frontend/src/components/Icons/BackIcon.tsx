import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "native-base";
import React from "react";

const BackIcon = () => {
  const { goBack } = useNavigation();

  return (
    <Icon
      as={SimpleLineIcons}
      onPress={goBack}
      name="arrow-left"
      color="text.main"
      size="md"
    />
  );
};

export default BackIcon;
