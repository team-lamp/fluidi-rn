import React, { useCallback } from "react";
import Text from "./themed/Text";
import { StyleSheet } from "react-native";
import { View, Thumbnail } from "native-base";
import { Message as MessageType } from "../types";
import { colors } from "../constants/styleGuide";

interface MessageProps {
  message: MessageType;
  isOwnMessage: boolean;
  showDetails: boolean;
}

const Message = ({ message, showDetails, isOwnMessage }: MessageProps) => {
  console.log(message.user_photo);

  const avatar = useCallback(() => {
    if (!message.user_photo) {
      return (
        <View
          style={{
            height: 26,
            width: 26,
            borderRadius: 26 / 2,
            borderWidth: 1,
            borderColor: colors.lowOpacity.brand,
          }}
        >
          <Text variant="caption">{message.username[0]}</Text>
        </View>
      );
    }
    if (message.user_photo) {
      return (
        <Thumbnail
          source={{ uri: message.user_photo }}
          style={{
            height: 26,
            width: 26,
            borderWidth: 1,
            borderColor: colors.lowOpacity.brand,
          }}
        />
      );
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { alignItems: isOwnMessage ? "flex-end" : "flex-start" },
      ]}
    >
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: isOwnMessage
              ? colors.brand
              : colors.secondaryBackground,
          },
        ]}
      >
        <Text variant="body">{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentContainer: {
    maxWidth: "75%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 15,
  },
  nameAndDateContainer: {
    flexDirection: "row",
  },
  name: {
    marginRight: 10,
  },
});

export default Message;
