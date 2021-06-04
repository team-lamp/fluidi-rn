import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, TextInput, View } from "react-native";
import { colors } from "../constants/styleGuide";
import useStore from "../store";
import { Message as MessageType, UsersInRoom } from "../types";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: MessageType[];
  usersInRoom: UsersInRoom;
  usersTyping: number[];
  isTyping: boolean;
}

const MessageList = ({
  messages,
  usersInRoom,
  usersTyping,
  isTyping,
}: MessageListProps) => {
  const user = useStore((state) => state.user);
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message
            message={item}
            showDetails={true}
            isOwnMessage={Boolean(item.userId == user.id)}
            usersInRoom={usersInRoom}
            usersTyping={usersTyping}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        inverted
        // extraData={isTyping}
        // ListHeaderComponent={() => renderTypingIndicator(isTyping)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default MessageList;
