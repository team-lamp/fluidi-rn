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
    <View style={styles.container}>
      {showDetails && !isOwnMessage ? (
        <View style={styles.space}>
          <Thumbnail small source={{ uri: message.user_photo }} />
        </View>
      ) : (
        <View style={styles.space} />
      )}
      <View style={styles.contentContainer}>
        <Text
          variant="body"
          style={{ textAlign: isOwnMessage ? "right" : "left" }}
        >
          {message.content}
        </Text>
        {showDetails && (
          <Text
            variant="caption"
            style={{ textAlign: isOwnMessage ? "right" : "left" }}
          >
            {message.created_at}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
  space: {
    width: 50,
  },
  contentContainer: {
    justifyContent: "flex-start",
    flex: 1,
  },
  nameAndDateContainer: {
    flexDirection: "row",
  },
  name: {
    marginRight: 10,
  },
});

export default Message;
