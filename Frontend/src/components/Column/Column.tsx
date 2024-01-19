import { ScrollView, VStack } from "native-base";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { PropsWithChildren } from "react";

interface Props extends InterfaceVStackProps {
  scrollable?: boolean;
}

export const Column: React.FC<PropsWithChildren<Props>> = ({
  children,
  scrollable = false,
  ...rest
}) => {
  return scrollable ? (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <VStack {...rest}>{children}</VStack>
    </ScrollView>
  ) : (
    <VStack {...rest}>{children}</VStack>
  );
};

export const ColumnCentered: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <VStack alignItems="center" justifyContent="center" {...rest}>
      {children}
    </VStack>
  );
};

export const ColumnBetween: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <VStack alignItems="center" justifyContent="space-between" {...rest}>
      {children}
    </VStack>
  );
};

export const ColumnAround: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <VStack alignItems="space-around" justifyContent="center" {...rest}>
      {children}
    </VStack>
  );
};
