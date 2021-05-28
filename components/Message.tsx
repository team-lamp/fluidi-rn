import React from "react";
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
