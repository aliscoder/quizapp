import { Center, Text } from "native-base";
import { InterfaceCenterProps } from "native-base/lib/typescript/components/composites/Center/types";
import React from "react";

interface Props extends InterfaceCenterProps {
  type: "success" | "warning" | "danger" | "info";
  title: string;
}
const Label: React.FC<Props> = ({ type, title, ...rest }) => {
  return (
    <Center background={`${type}`} px={4} py={1} {...rest}>
      <Text>{title}</Text>
    </Center>
  );
};

export default Label;
