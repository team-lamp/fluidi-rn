import React, { ReactNode } from "react";
import { Text as NBText, RnTextStyleProp } from "native-base";
import { colors } from "../../constants/styleGuide";
import { StyleSheet } from "react-native";

type Variants = "body" | "header" | "title" | "caption";

interface TextProps {
  variant: Variants;
  children: ReactNode;
  style?: RnTextStyleProp;
}

function getTextStyle(variant: Variants) {
  if (variant === "body") return styles.body;
  if (variant === "header") return styles.header;
  if (variant === "title") return styles.title;
  if (variant === "caption") return styles.caption;
  return {};
}

const Text = ({ variant, children, style }: TextProps) => {
  const textStyle = getTextStyle(variant);

  return <NBText style={[textStyle, style]}>{children}</NBText>;
};

const styles = StyleSheet.create({
  body: {
    color: colors.contrastText,
    fontSize: 20,
    fontWeight: "200",
  },
  header: {
    color: colors.contrastText,
    fontSize: 25,
    fontWeight: "400",
  },
  title: {
    color: colors.contrastText,
    fontSize: 30,
    fontWeight: "600",
  },
  caption: {
    color: colors.secondaryText,
    fontSize: 14,
    fontWeight: "200",
  },
});

export default Text;
