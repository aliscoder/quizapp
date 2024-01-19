import { ITextProps, Text } from "native-base";
import React, { PropsWithChildren } from "react";

interface Props extends ITextProps {
  secondary?: boolean;
  trunc?: boolean;
  truncLength?: number;
}

export const TextTitle: React.FC<PropsWithChildren<Props>> = ({
  children,
  trunc = false,
  truncLength = 20,
  secondary = false,
  ...rest
}) => {
  return (
    <Text
      fontSize="lg"
      color={secondary ? "text.secondary" : "text.main"}
      fontFamily="YekanBold"
      {...rest}
    >
      {trunc ? children?.toString().slice(0, truncLength) + " ..." : children}
    </Text>
  );
};

export const TextMuted: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <Text lineHeight="lg" color="text.muted" {...rest}>
      {children}
    </Text>
  );
};

export const TextTiny: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <Text lineHeight="lg" color="text.main" fontSize="sm" {...rest}>
      {children}
    </Text>
  );
};

export const TextNormal: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <Text lineHeight="lg" color="text.main" fontSize="md" {...rest}>
      {children}
    </Text>
  );
};
