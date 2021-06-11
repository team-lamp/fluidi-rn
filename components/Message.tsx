import React, { useState, useEffect } from "react";
import Text from "./themed/Text";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import { Message as MessageType, UsersInRoom } from "../types";
import { colors } from "../constants/styleGuide";

interface MessageProps {
  message: MessageType;
  isOwnMessage: boolean;
  usersInRoom: UsersInRoom;
  usersTyping: number[];
  showDetails: boolean;
}

const Message = ({
  message,
  isOwnMessage,
  usersInRoom,
  usersTyping,
}: MessageProps) => {
  const [isUserInRoom, setIsUserInRoom] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const usersCopy = [...usersInRoom];
    const userId = message.userId;
    setIsUserInRoom(Boolean(usersInRoom.length) && usersCopy.includes(userId));
  }, [usersInRoom]);

  useEffect(() => {
    const typingUsersCopy = [...usersTyping];
    const userId = message.userId;
    if (
      !isOwnMessage &&
      Boolean(typingUsersCopy) &&
      typingUsersCopy.includes(userId)
    ) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [usersTyping]);

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
              ? colors.lowOpacity.brand
              : colors.lowOpacity.secondaryBackground,
          },
        ]}
      >
        <Text variant="body">{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },
  contentContainer: {
    maxWidth: "75%",
    paddingVertical: 5,
    paddingHorizontal: 13,
    alignItems: "center",
    borderRadius: 15,
  },
});

export default Message;
