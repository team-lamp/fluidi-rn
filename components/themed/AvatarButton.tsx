import React from "react";
import { Thumbnail } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface AvatarButtonProps extends TouchableOpacityProps {
  uri: string;
}

const AvatarButton = ({ uri, onPress }: AvatarButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Thumbnail small source={{ uri }} />
    </TouchableOpacity>
  );
};

export default AvatarButton;
