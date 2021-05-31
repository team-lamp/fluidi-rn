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
  const Avatar = () => {
    if (!message.user_photo) {
      return (
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
            borderWidth: 2,
            borderColor: isOwnMessage
              ? colors.brand
              : colors.secondaryBackground,
            position: "absolute",
            top: 0,
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
            height: 30,
            width: 30,
            borderWidth: 2,
            borderColor: isOwnMessage
              ? colors.brand
              : colors.secondaryBackground,
            position: "absolute",
            top: 0,
          }}
        />
      );
    }
  };

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
            paddingLeft: isOwnMessage ? 10 : 25,
            paddingRight: isOwnMessage ? 25 : 10,
          },
        ]}
      >
        <Text variant="body">{message.content}</Text>
      </View>
      <Avatar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contentContainer: {
    maxWidth: "75%",
    paddingVertical: 5,
    paddingHorizontal: 10,
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
