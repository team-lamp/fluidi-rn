import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, TextInput, View } from "react-native";
import { colors } from "../constants/styleGuide";
import { Message as MessageType } from "../types";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: MessageType[];
}

const renderTypingIndicator = (isTyping: boolean) => {
  return <TypingIndicator isTyping={isTyping} />;
};

const MessageList = ({ messages }: MessageListProps) => {
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
          />
        )}
        keyExtractor={(item) => String(item.id)}
        inverted
        // extraData={isTyping}
        // ListHeaderComponent={() => renderTypingIndicator(isTyping)}
      />
      <TypingIndicator isTyping={isTyping} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageList;
