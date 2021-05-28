import React, { useState } from "react";
import { StyleSheet, FlatList, TextInput, View } from "react-native";
import { colors } from "../constants/styleGuide";
import { Message as MessageType } from "../types";
import Message from "./Message";
import KeyboardSpacer from "react-native-keyboard-spacer";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} showAvatar={true} />}
        keyExtractor={(item) => String(item.id)}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageList;
