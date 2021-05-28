import React from "react";
import Text from "./themed/Text";
import { StyleSheet } from "react-native";
import { View, Thumbnail } from "native-base";
import { Message as MessageType } from "../types";
import { colors } from "../constants/styleGuide";

interface MessageProps {
  message: MessageType;
  showAvatar: boolean;
}

const Message = ({ message, showAvatar }: MessageProps) => {
  return (
    <View style={styles.container}>
      {showAvatar ? (
        <View style={styles.leftSpace}>
          <Thumbnail small source={{ uri: message.user_photo }} />
        </View>
      ) : (
        <View style={styles.leftSpace} />
      )}
      <View style={styles.contentContainer}>
        {showAvatar && (
          <View style={styles.nameAndDateContainer}>
            <Text variant="caption" style={styles.name}>
              {message.username}
            </Text>
            <Text variant="caption">{message.created_at}</Text>
          </View>
        )}
        <Text variant="body">{message.content}</Text>
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
    alignItems: "flex-start",
  },
  leftSpace: {
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
