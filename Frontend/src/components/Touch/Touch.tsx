import React from "react";
import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
}
const Touch: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <TouchableOpacity style={{ padding: 5 }} activeOpacity={0.9} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Touch;
