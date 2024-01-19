import { HStack } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { PropsWithChildren } from "react";

interface Props extends InterfaceHStackProps {}

export const Row: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <HStack alignItems="center" {...rest}>
      {children}
    </HStack>
  );
};

export const RowCentered: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <HStack alignItems="center" justifyContent="center" {...rest}>
      {children}
    </HStack>
  );
};

export const RowBetween: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <HStack alignItems="center" justifyContent="space-between" {...rest}>
      {children}
    </HStack>
  );
};

export const RowAround: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <HStack alignItems="center" justifyContent="space-around" {...rest}>
      {children}
    </HStack>
  );
};
