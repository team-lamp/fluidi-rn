import React from "react";
import { Image, StyleProp, ImageStyle, ViewStyle, View } from "react-native";
import { colors, shadow } from "../../constants/styleGuide";
import Text from "./Text";

interface AvatarProps {
  uri?: string;
  letter?: string;
  variant: "small" | "large";
  textVariant?: "body" | "caption" | "header" | "title";
  imageStyle?: StyleProp<ImageStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

const Avatar = ({
  uri,
  letter,
  variant,
  imageStyle,
  viewStyle,
  textVariant,
}: AvatarProps) => {
  const height = variant === "small" ? 36 : 60;
  const width = variant === "small" ? 36 : 60;
  const borderRadius = height / 2;

  if (Boolean(uri)) {
    return (
      <>
        <Image
          source={{ uri }}
          style={[
            {
              height,
              width,
              borderRadius,
              zIndex: 50,
            },
            imageStyle,
          ]}
        />
        <View
          style={[
            {
              position: "absolute",
              top: 0,
              height,
              width,
              borderRadius,
              backgroundColor: colors.contrastText,
            },
            shadow,
          ]}
        />
      </>
    );
  } else {
    return (
      <View
        style={[
          {
            height,
            width,
            borderRadius,
            backgroundColor: colors.secondaryBackground,
            alignItems: "center",
            justifyContent: "center",
          },
          shadow,
          viewStyle,
        ]}
      >
        <Text
          variant={textVariant ?? "body"}
          style={{ color: colors.contrastText }}
        >
          {letter}
        </Text>
      </View>
    );
  }
};

export default Avatar;
