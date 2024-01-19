import { Ionicons } from "@expo/vector-icons";
import { IButtonProps, Icon, Button as NButton } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { useCallback } from "react";

interface Props extends IButtonProps {
  title: string;
  titleColor?: ColorType;
  scheme?: ColorType;
  outline?: boolean;
  LIcon?: string | undefined;
  RIcon?: string | undefined;
  size?: "1/2" | "1/3" | "1/4" | "full";
}

const Button: React.FC<Props> = ({
  title,
  scheme = "secondary",
  outline = false,
  size = "full",
  titleColor,
  LIcon,
  RIcon,
  ...rest
}) => {
  const setTitleColor = useCallback(() => {
    if (!titleColor) {
      if (outline) {
        return scheme;
      }

      return "text.light";
    }
    return titleColor;
  }, [titleColor]);

  return (
    <NButton
      w={size}
      _pressed={{ opacity: 0.8 }}
      background={outline ? "transparent" : scheme}
      borderColor={outline ? scheme : "transparent"}
      borderWidth={1}
      height="10"
      _loading={{ opacity: 0.4 }}
      // height="10"
      p={2}
      _text={{
        color: setTitleColor(),
        // fontFamily: "YekanBold",
        fontSize: "lg",
      }}
      leftIcon={
        LIcon ? <Icon as={Ionicons} name={LIcon} size="md" color={setTitleColor()} /> : undefined
      }
      rightIcon={
        RIcon ? <Icon as={Ionicons} name={RIcon} size="md" color={setTitleColor()} /> : undefined
      }
      {...rest}
    >
      {title}
    </NButton>
  );
};

export default Button;
