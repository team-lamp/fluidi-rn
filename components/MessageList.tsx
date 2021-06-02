import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, TextInput, View } from "react-native";
import { colors } from "../constants/styleGuide";
import { Message as MessageType, UsersInRoom } from "../types";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: MessageType[];
  usersInRoom: UsersInRoom;
  usersTyping: number[];
}

const MessageList = ({
  messages,
  usersInRoom,
  usersTyping,
}: MessageListProps) => {
  const [isTyping, setIsTyping] = useState(true);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message
            message={item}
            showDetails={true}
            isOwnMessage={Boolean(item.username === "You")}
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
