import { Ionicons } from "@expo/vector-icons";
import {
  Input as IInput,
  IInputProps,
  ITextAreaProps,
  Icon,
  TextArea,
  useTheme,
} from "native-base";
import React from "react";
import { TextMuted } from "../Text/Text";

interface InputProps extends IInputProps {
  hasError?: boolean;
  icon?: any;
  label?: string;
  multiline?: boolean;
  onAction?: () => void;
}

const Input: React.FC<InputProps & ITextAreaProps> = ({
  multiline = false,
  hasError = false,
  icon,
  label,
  onAction,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <>
      {label && (
        <TextMuted fontSize="lg" mb={2}>
          {label}
        </TextMuted>
      )}
      {multiline ? (
        <TextArea
          autoCompleteType=""
          width="100%"
          borderWidth={0.4}
          backgroundColor="transparent"
          borderColor="border.muted"
          lineHeight={25}
          textAlign="right"
          _input={{ selectionColor: theme.colors.text.main }}
          color="text.main"
          fontSize="md"
          placeholderTextColor="text.placeholder"
          borderRadius={5}
          _focus={{
            borderColor: "border.sharp",
            borderWidth: 1,
          }}
          leftElement={
            <Icon
              as={Ionicons}
              onPress={onAction}
              style={{
                marginLeft: 10,
              }}
              color="text.muted"
              name={icon}
              size="sm"
            />
          }
          {...rest}
        />
      ) : (
        <IInput
          borderWidth={0.4}
          backgroundColor="transparent"
          borderColor="border.muted"
          textAlign="right"
          _input={{ selectionColor: theme.colors.text.muted, fontSize: "lg" }}
          color="text.main"
          fontSize="md"
          placeholderTextColor="text.placeholder"
          height="12"
          pr={3}
          letterSpacing={2}
          borderRadius={5}
          _focus={{
            borderColor: "border.sharp",
            borderWidth: 1,
          }}
          leftElement={
            <Icon
              as={Ionicons}
              onPress={onAction}
              style={{
                marginLeft: 10,
              }}
              color="text.muted"
              name={icon}
              size="md"
            />
          }
          {...rest}
        />
      )}
    </>
  );
};
export default Input;
