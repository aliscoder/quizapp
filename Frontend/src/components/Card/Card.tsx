import { theme } from "@utils";
import { Text, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import { ColorType } from "native-base/lib/typescript/components/types";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { RowBetween } from "../Row/Row";

interface CardProps extends IViewProps {
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  header?: React.ReactNode;
  subtitle?: string;
  bgColor?: string;
  transparent?: boolean;
  leftTitleElement?: React.ReactNode;
  shadowed?: boolean;
  centerTitle?: boolean;
}
const Card: React.FC<CardProps> = ({
  children,
  title,
  showTitle = true,
  bgColor,
  header,
  subtitle,
  transparent,
  leftTitleElement,
  shadowed = true,
  centerTitle = false,
  ...rest
}) => {
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: bgColor
          ? bgColor
          : transparent
          ? "transparent"
          : theme.colors.card.background,
        shadowColor: theme.colors.card.shadow,
        borderRadius: 8,
        elevation: transparent ? 0 : shadowed ? 4 : 0,
        shadowOffset: transparent
          ? undefined
          : shadowed
          ? {
              width: Platform.OS === "web" ? 5 : 0,
              height: Platform.OS === "web" ? 5 : 0,
            }
          : undefined,
        shadowOpacity: transparent
          ? 0
          : shadowed
          ? Platform.OS === "web"
            ? 0.2
            : 0
          : 0,
        shadowRadius: transparent
          ? 0
          : shadowed
          ? Platform.OS === "web"
            ? 15
            : 0
          : 0,
      }}
      {...rest}
    >
      {header}
      {showTitle && title && (
        <>
          {leftTitleElement ? (
            <RowBetween alignItems="center" mb={subtitle ? 1 : 5}>
              {leftTitleElement}
              <Text color="text.main" fontSize="xl">
                {title}
              </Text>
            </RowBetween>
          ) : (
            <Text
              textAlign={centerTitle ? "center" : "right"}
              color="text.main"
              fontSize="xl"
              mb={subtitle ? 1 : 5}
            >
              {title}
            </Text>
          )}
        </>
      )}
      {subtitle && (
        <Text
          textAlign={centerTitle ? "center" : "right"}
          color="text.main"
          fontSize="sm"
          mb={5}
        >
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 3,
    marginHorizontal: 3,
    marginVertical: 3,
    // shadowOffset: {
    //   width: Platform.OS === "web" ? 5 : 0,
    //   height: Platform.OS === "web" ? 5 : 0,
    // },
    // shadowOpacity: Platform.OS === "web" ? 0.2 : 0,
    // shadowRadius: Platform.OS === "web" ? 15 : 0,
  },
});

export default Card;
